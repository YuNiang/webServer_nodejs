'use strict';
const Joi = require('joi');
const serviceTeamInfo = require('../../service/api_team_info');
const serviceAdminInfo = require('../../service/tb_admin_info');
const WXBizDataCrypt = require('../../service/WXBizDataCrypt');
const rpc_gamedatabase = require('../../rpc/gamedatabase');
const rp = require('request-promise');
const JWT = require('jsonwebtoken');
var crypto = require('crypto');
const Boom = require('boom');
const moment = require('moment');

//wxfe3a5e25b9e716cd
//38e2c7420f87ea0fff39f24fd5e88695
//GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxfe3a5e25b9e716cd&secret=38e2c7420f87ea0fff39f24fd5e88695
//071yG1QR1O5YT51QO4SR161nQR1yG1QZ
//https://api.weixin.qq.com/sns/jscode2session?appid=wxfe3a5e25b9e716cd&secret=38e2c7420f87ea0fff39f24fd5e88695&js_code=071yG1QR1O5YT51QO4SR161nQR1yG1QZ&grant_type=authorization_code,userInfo
/**
 * 小程序侧登录
 */
module.exports.login = {
  validate: {
    payload: {
      jscode: Joi.string().min(0).max(100).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {jscode} = request.payload;
    let options = {
      uri: "https://api.weixin.qq.com/sns/jscode2session",
      qs: {
        appid: "wxfe3a5e25b9e716cd",
        secret: "38e2c7420f87ea0fff39f24fd5e88695",
        js_code: jscode,
        grant_type: "authorization_code",
      },
      json: true,
    };

    try {
      const DB = request.getDb(process.env.DB_DBNAME);
      const AdminInfo = DB.getModel('tb_admin_info');
      let result = await rp(options);
      if (!result) {
        throw new Error("登录失败，请稍后再试！");
      }
      if (result.errcode != undefined) {
        if (result.errcode != 0) {
          throw new Error("登录失败，请重新登录！" + result.errmsg);
        }
      }

      const [data, created] = await AdminInfo.findOrCreate({
        where: {sOpenId: result.openid},
        defaults: {
          sOpenId: result.openid,
          sSessionKey: result.session_key,
          sUnionid: result.unionid ? result.unionid : "",
          dtRegister: moment().format("YYYY-MM-DD HH:mm:ss")
        }
      });
      if (created == false) {
        await AdminInfo.update({sSessionKey: result.session_key}, {where: {sOpenId: result.openid}});
      }
      //下放登录成功信息
      const session = {
        type: 'api',
        username: result.openid,
        roleId: data.iRoleId,
        expire: Date.now() + 24 * 7 * 3600000 //24小时
      };
      const token = JWT.sign(session, process.env.JWT_SECRET);
      let coach = 0;
      if (data.iRoleId == 3 && data.iTeamId != 0) {
        coach = data.iTeamId;
      }
      reply({"openid": result.openid, "unionid": result.unionid ? result.unionid : "", coach: coach, "token": token, roleId: session.roleId});
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

//通过小程序授权，获取用户unionid信息
module.exports.update_user_info = {
  auth: 'jwt',
  validate: {
    payload: {
      encryptedData: Joi.string().required(),
      iv: Joi.string().required(),
      openid: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const AdminInfo = DB.getModel('tb_admin_info');
    const AdminUser = DB.getModel('admin_user');
    try {
      const {encryptedData, iv, openid} = request.payload;
      const uinfo = await AdminInfo.findOne({where: {sOpenId: openid}});
      if (!uinfo) {
        throw new Error("用户不存在");
      }
      if (uinfo.sSessionKey == "") {
        throw new Error("请重新登录");
      }
      let pc = new WXBizDataCrypt("wxfe3a5e25b9e716cd", uinfo.sSessionKey);
      let data = pc.decryptData(encryptedData, iv);

      AdminInfo.update({
        sUserName: data.nickName,
        sUserAvatar: data.avatarUrl,
        sUnionid: data.unionId
      }, {where: {sOpenId: openid}});
      //更新到管理员信息表
      AdminUser.update({adminname: data.nickName}, {where: {username: data.unionId}});
      reply({"unionid": data.unionId});
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}


/**
 * 获取所有队伍列表
 */
module.exports.team_all = {
  // auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DBPL = request.getDb(process.env.DB_DBNAME);
    const TeamInfo = DBPL.getModel('tb_team_info');
    try {
      const teams = await TeamInfo.findAll({where: {IsLPL: 1}})
      reply(teams);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 根据赛季信息获取所有队伍列表
 */
module.exports.team_by_season = {
  auth: 'jwt_public',
  validate: {
    query: {
      seasonId: Joi.number().integer().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {seasonId} = request.query;
    const sql = `select a.* from tb_team_info as a inner join tb_season_team as b on a.id = b.iTeamId where b.iSeasonId=${seasonId} order by b.iTeamId asc`;
    try {
      const teams = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      reply(teams);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 获取队伍详细信息
 */
module.exports.team_detail = {
  auth: 'jwt',
  validate: {
    query: {
      teamId: Joi.number().integer().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {teamId} = request.query;
    try {
      const teamInfo = await serviceTeamInfo.getTeamInfo(request.server, teamId);
      if (!teamInfo) {
        throw new Error("指定队伍不存在");
      }
      reply(teamInfo);
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 获取所有赛季列表
 */
module.exports.season_all = {
  auth: 'jwt_public',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const SeasonInfo = DB.getModel('tb_season_info');
    const AdminInfo = DB.getModel('tb_admin_info');
    const session = request.auth.credentials;
    try {
      const uinfo = await AdminInfo.findOne({where: {sOpenId: session.username}, raw: true});
      let seasons = await SeasonInfo.findAll({where: {iOpen: 1}, raw: true, order: [['id', 'desc']]});
      let followSeasonId = 0;
      //设置默认赛事
      if (uinfo && uinfo.iTeamId){
        let sql = `select a.iSeasonId from tb_season_team as a inner join tb_season_info as b on a.iSeasonId = b.id where b.iOpen = 1 and a.iTeamId = ${uinfo.iTeamId} order by a.iSeasonId desc limit 1`;
        const userSeasonFollow = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
        if(userSeasonFollow.length > 0){
          followSeasonId = userSeasonFollow[0].iSeasonId;
        }
      }

      for (var i = 0; i < seasons.length;i++){
        if(followSeasonId == seasons[i].id){
          seasons[i]["defaultSelect"] = true;
        }else{
          seasons[i]["defaultSelect"] = false;
        }
      }
      reply(seasons);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 条件查询 根据 赛事，日期，队伍id 获取赛程信息
 * 只查询最近30场比赛信息
 */
module.exports.search_match = {
  auth: 'jwt',
  validate: {
    payload: {
      teamId: Joi.string(),
      date: Joi.string().min(0).max(10),
      seasonId: Joi.number().integer().required(),
      page: Joi.number().integer()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {teamId, date, seasonId, page} = request.payload;
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchInfo = DB.getModel('tb_match_info');
    const AdminInfo = DB.getModel('tb_admin_info');
    const session = request.auth.credentials;
    try {
      if (seasonId == 0) {
        throw new Error("赛季不能为空")
      }
      let condition = `iSeason = ${seasonId} `;
      if (teamId) {
        let teamIds = teamId.split(",");
        let searchIds = [];
        for (let i = 0; i < teamIds.length; i++) {
          var tmpid = parseInt(teamIds[i]);
          searchIds.push(` FIND_IN_SET(${tmpid},TeamInfo) `);
        }
        if (searchIds.length > 0) {
          let searchStr = searchIds.join("or");
          condition = `${condition} and (${searchStr})`;
        }
      }
      if (date) {
        condition = `${condition} and date(MatchStart) = "${date}"`;
      } else {
        let today = moment().format("YYYY-MM-DD");
        condition = `${condition} and date(MatchStart) >= "${today}"`;
      }
      let offset = 0;
      if (page) {
        offset = (page - 1) * 30;
      }
      const sql = `select * from tb_match_info where ${condition} order by MatchStart asc limit ${offset},30`;
      const matchs = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT})
      const uinfo = await AdminInfo.findOne({where: {sOpenId: session.username}, raw: true})
      let coachTeamId = 0;
      if (uinfo && uinfo.iRoleId == 3) {
        coachTeamId = uinfo.iTeamId
      }
      for (let i = 0; i < matchs.length; i++) {
        let detail = matchs[i];
        let teams = detail["TeamInfo"].split(",");
        if (teams[0] == coachTeamId || teams[1] == coachTeamId) {
          matchs[i]["coachTeamId"] = coachTeamId;
        } else {
          matchs[i]["coachTeamId"] = 0;
        }
        let boIndexDetail = await rpc_gamedatabase.getGameAndBOStatus((detail.id));
        let result = {};
        if(boIndexDetail.success == true){
          result = boIndexDetail.data;
          matchs[i]["matchStatus"] = result.matchStatus;
          matchs[i]["winTeamID"] = result.winTeamID;
          let obj = {};
          result.teams.map((value,j)=>{
            obj[value.teamID] = value.winBOSession.length;
          })
          matchs[i]['TeamScore'] = obj;
        }
      }
      reply(matchs);
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 获取赛事日历
 * 向前6个月，向后取3个月
 */
module.exports.match_date = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      let minDate = moment().subtract(6, "months").format("YYYY-MM-DD");
      let maxDate = moment().add(3, "months").format("YYYY-MM-DD");
      let sql = `select date(MatchStart) as mday FROM tb_match_info WHERE date(MatchStart) >= "${minDate}" and date(MatchStart) <= "${maxDate}" GROUP by date(MatchStart)`;
      const dates = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      reply(dates);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 获取赛程详细信息
 * 根据赛程id获取
 */
module.exports.match_detail = {
  auth: 'jwt',
  validate: {
    query: {
      matchId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DBPL = request.getDb(process.env.DB_DBNAME);
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchInfo = DBPL.getModel('tb_match_info');
    const TeamFirst = DB.getModel("tb_team_first");
    const TeamFirstDefault = DB.getModel("tb_team_first_default");
    const AdminInfo = DB.getModel('tb_admin_info');

    const {matchId} = request.query;
    const session = request.auth.credentials;

    try {
      if (!matchId) {
        throw new Error("赛程id不能为空")
      }
      const uinfo = await AdminInfo.findOne({where: {sOpenId: session.username}, raw: true});
      const match = await MatchInfo.findOne({where: {id: matchId}});
      if (!match) {
        throw new Error("赛程不存在");
      }
      let firsts = await TeamFirst.findAll({where: {iMatchId: matchId}, raw: true})
      for (var i = firsts.length - 1; i >= 0; i--) {
        let abortTime = new Date(firsts[i].dtAbortTime).getTime();
        let publishTime = new Date(firsts[i].dtPublishTime).getTime();
        let timeNow = Date.now();
        if (publishTime > timeNow) {
          firsts[i]["doPublish"] = false;
          //未到公布时间
          //如果不是本队教练，或不是教练 则隐藏当前首发信息
          if (abortTime < timeNow) {
            firsts[i]["doConfirm"] = true;
          } else {
            firsts[i]["doConfirm"] = false;
          }

          if (uinfo.iRoleId != 3 || firsts[i].iTeamId != uinfo.iTeamId) {
            firsts[i].iSup = 0;
            firsts[i].iJug = 0;
            firsts[i].iMid = 0;
            firsts[i].iTop = 0;
            firsts[i].iAdc = 0;
            firsts[i].iCoach = 0;
            firsts[i].iSubCoach = 0;
            firsts[i].sSide = "";
            firsts[i]["canModify"] = false;
          } else {
            //教练身份
            if (!firsts[i].iSup || !firsts[i].iJug || !firsts[i].iMid || !firsts[i].iTop || !firsts[i].iAdc || !firsts[i].iCoach || !firsts[i].iSubCoach) {
              const defaultFirst = await TeamFirstDefault.findOne({where: {iTeamId: firsts[i].iTeamId}});
              if (defaultFirst) {
                firsts[i].iSup = defaultFirst.iSup;
                firsts[i].iJug = defaultFirst.iJug;
                firsts[i].iMid = defaultFirst.iMid;
                firsts[i].iTop = defaultFirst.iTop;
                firsts[i].iAdc = defaultFirst.iAdc;
                firsts[i].iCoach = defaultFirst.iCoach;
                firsts[i].iSubCoach = defaultFirst.iSubCoach;
              }
              if (firsts[i].sSide == "" && firsts[i].iFirstChoose == firsts[i].iTeamId) {
                firsts[i].sSide = "blue";
              }
            }
            firsts[i]["canModify"] = true;
          }
        } else {
          firsts[i]["doPublish"] = true;
          firsts[i]["doConfirm"] = false;
          firsts[i]["canModify"] = false;
          //已发布，系统自动填充默认首发
          const defaultFirst = await TeamFirstDefault.findOne({where: {iTeamId: firsts[i].iTeamId}});
          if (defaultFirst) {
            if(firsts[i].iSup == 0 && defaultFirst.iSup != 0){
              firsts[i].iSup = defaultFirst.iSup;
            }
            if(firsts[i].iJug == 0 && defaultFirst.iJug != 0){
              firsts[i].iJug = defaultFirst.iJug;
            }
            if(firsts[i].iMid == 0 && defaultFirst.iMid != 0){
              firsts[i].iMid = defaultFirst.iMid;
            }
            if(firsts[i].iTop == 0 && defaultFirst.iTop != 0){
              firsts[i].iTop = defaultFirst.iTop;
            }
            if(firsts[i].iAdc == 0 && defaultFirst.iAdc != 0){
              firsts[i].iAdc = defaultFirst.iAdc;
            }
            if(firsts[i].iCoach == 0 && defaultFirst.iCoach != 0){
              firsts[i].iCoach = defaultFirst.iCoach;
            }
            if(firsts[i].iSubCoach == 0 && defaultFirst.iSubCoach != 0){
              firsts[i].iSubCoach = defaultFirst.iSubCoach;
            }
          }
          if (firsts[i].sSide == "" && firsts[i].iFirstChoose == firsts[i].iTeamId) {
            firsts[i].sSide = "blue";
          }
        }
      }
      let teamFirstsMap = {};
      firsts.forEach((item) => {
        teamFirstsMap[`${item.iTeamId}:${item.iBo}`] = item;
      })
      firsts.forEach((item) => {
        if (item.iBo > 1) {
          const preItem = teamFirstsMap[`${item.iTeamId}:${item.iBo - 1}`];
          item.iTopIsFirst = 0;
          if (item.iTop && item.iTop !== preItem.iTop) {
            item.iTopIsFirst = 1;
          }
          item.iJugIsFirst = 0;
          if (item.iJug && item.iJug !== preItem.iJug) {
            item.iJugIsFirst = 1;
          }
          item.iMidIsFirst = 0;
          if (item.iMid && item.iMid !== preItem.iMid) {
            item.iMidIsFirst = 1;
          }
          item.iAdcIsFirst = 0;
          if (item.iAdc && item.iAdc !== preItem.iAdc) {
            item.iAdcIsFirst = 1;
          }
          item.iSupIsFirst = 0;
          if (item.iSup && item.iSup !== preItem.iSup) {
            item.iSupIsFirst = 1;
          }
        }
      })
      const boIndexDetail = await rpc_gamedatabase.getGameAndBOStatus((matchId));
      let result = {};
      if(boIndexDetail.success == true){
        result = boIndexDetail.data;
      }


      reply({"list": firsts, "match": match,result});
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

/**
 * 根据teamid 获取选手列表
 */
module.exports.player_all = {
  auth: 'jwt',
  validate: {
    query: {
      teamId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DBPL = request.getDb(process.env.DB_DBNAME);
    const PlayerInfo = DBPL.getModel('tb_player_info');
    const {teamId} = request.query;
    try {
      if (!teamId) {
        throw new Error("队伍ID不能为空")
      }
      const players = await PlayerInfo.findAll({where: {TeamID: teamId}})
      reply(players);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}


module.exports.coach_all = {
  auth: 'jwt',
  validate: {
    query: {
      teamId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const CoachInfo = DB.getModel('tb_coach_info');
    const {teamId} = request.query;
    try {
      if (!teamId) {
        throw new Error("队伍ID不能为空")
      }
      const coaches = await CoachInfo.findAll({where: {iTeamId: teamId}})
      reply(coaches);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
}

// 申请成为管理员
module.exports.admin_apply = {
  auth: 'jwt_public',
  validate: {
    payload: {
      name: Joi.string().max(255).required(),
      phone: Joi.string().max(11).required(),
      teamId: Joi.number().integer().min(0).required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const session = request.auth.credentials;
    const {name, phone, teamId} = request.payload;
    serviceAdminInfo.save(request.server, session.username, name, phone, teamId).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
}

// 查询管理员申请状态
module.exports.admin_apply_status = {
  auth: 'jwt_public',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const session = request.auth.credentials;
    const criteria = {
      sOpenId: session.username
    };
    serviceAdminInfo.queryOne(request.server, criteria, ['sName', 'iStatus']).then(data => {
      // backward compatibility
      if (data.iStatus == -1) data.iStatus = 0;
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
}

