'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const serviceTeamInfo = require('../../service/api_team_info');


/**
 * 获取所有队伍列表
 */
module.exports.team_all_by_season = {
  auth: 'jwt',
  validate: {
    query: {
      iSeasonId: Joi.number().integer()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const TeamInfo = DB.getModel('tb_team_info');
    const {iSeasonId} = request.query;
    try {
      let sql = "";
      if (iSeasonId) {
        sql = `select a.id,a.TeamDes,a.TeamLogo from tb_team_info as a inner join tb_season_team as b on a.id=b.iTeamId where b.iSeasonId = ${iSeasonId}`;
      }else{
        sql = `select id,TeamDes,TeamLogo from tb_team_info where 1`;
      }
      const teams = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      reply(teams);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

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
};

/**
 * 获取所有赛季列表
 */
module.exports.season_all = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const SeasonInfo = DB.getModel('tb_season_info');
    try {
      const seasons = await SeasonInfo.findAll({where: {iOpen: 1}});
      reply(seasons);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

module.exports.city_all = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const CityInfo = DB.getModel('tb_match_city_info');
    try {
      const citys = await CityInfo.findAll();
      reply(citys);
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
      teamId: Joi.number().integer(),
      date: Joi.string().min(0).max(10),
      seasonId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {teamId, date, seasonId} = request.payload;
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchInfo = DB.getModel('tb_match_info');
    try {
      if (seasonId == 0) {
        throw new Error("赛季不能为空");
      }
      let condition = `iSeason = ${seasonId} `;
      if (teamId) {
        condition = `${condition} and FIND_IN_SET(${teamId},"TeamInfo")`;
      }
      if (date) {
        condition = `${condition} and date(MatchStart) = "${date}"`;
      }
      const sql = `select * from tb_match_info where ${condition} order by MatchStart desc limit 30`;
      const matchs = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      reply(matchs);
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

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
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchInfo = DB.getModel('tb_match_info');
    const MacthBattle = DB.getModel('tb_match_battle_log');
    const TeamFirst = DB.getModel("tb_team_first");
    const AdminInfo = DB.getModel('tb_admin_info');
    const {matchId} = request.query;
    const session = request.auth.credentials;

    try {
      if (!matchId) {
        throw new Error("赛程id不能为空");
      }
      const match = await MatchInfo.findOne({where: {id: matchId}});
      if (!match) {
        throw new Error("赛程不存在");
      }
      let firsts = await TeamFirst.findAll({where: {iMatchId: matchId}});
      reply({"list": firsts, "match": match});
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

//获取首发信息
module.exports.search_match_detail = {
  auth: 'jwt',
  validate: {
    payload: {
      teamId: Joi.array().items(Joi.number().integer()).max(2),
      date: Joi.string(),
      seasonId: Joi.number().integer(),
      cityId: Joi.array().items(Joi.number().integer()).max(2),
      page: Joi.number().integer(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchInfo = DB.getModel('tb_match_info');
    const TeamFirst = DB.getModel("tb_team_first");
    const AdminInfo = DB.getModel('tb_admin_info');
    const {teamId, date, seasonId, cityId, page} = request.payload;
    try {
      let condition = " 1 = 1 ";
      if (seasonId) {
        condition = `${condition} and iSeason = ${seasonId} `;
      } else {
        condition = `${condition} and iSeason in (select id from tb_season_info where iOpen = 1) `;
      }
      if (teamId) {
        let searchIds = [];
        for (var i = 0; i < teamId.length; i++) {
          var tmpid = teamId[i];
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
      if (cityId && cityId.length > 0) {
        let cityStr = cityId.join(",");
        condition = `${condition} and CityCode in (${cityStr})`;
      }

      let index = 0;
      if (page) {
        index = (page - 1) * 10;
      }
      const matchsCnt = await global.Sequelize.query(`select count(id) as total from tb_match_info where ${condition}`, {type: global.Sequelize.QueryTypes.SELECT});
      const sql = `select * from tb_match_info where ${condition} order by MatchStart asc limit ${index},10`;
      const matchs = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      for (let i = matchs.length - 1; i >= 0; i--) {
        let detail = matchs[i];
        let firsts = await TeamFirst.findAll({where: {iMatchId: detail.id}});
        matchs[i]["firsts"] = firsts;
      }
      reply({"rows": matchs, "count": matchsCnt[0].total});
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

/**
 * 根据teamid 获取选手列表
 */
module.exports.player_all = {
  auth: 'jwt',
  validate: {
    query: {
      teamId: Joi.number().integer(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const PlayerInfo = DB.getModel('tb_player_info');
    const {teamId} = request.query;
    try {
      if (teamId) {
        const players = await PlayerInfo.findAll({
          where: {TeamID: teamId},
          attributes: ['id', 'PlayerDes', 'PlayerPos', 'TeamID', 'PlayerAvatar']
        });
        reply(players);
      } else {
        const players = await PlayerInfo.findAll({
          where: {},
          attributes: ['id', 'PlayerDes', 'PlayerPos', 'TeamID', 'PlayerAvatar']
        });
        reply(players);
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};


module.exports.coach_all = {
  auth: 'jwt',
  validate: {
    query: {
      teamId: Joi.number().integer(),
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
      if (teamId) {
        const coachs = await CoachInfo.findAll({
          where: {iTeamId: teamId},
          attributes: ['id', 'sName', 'sNickName', 'iTeamId', 'iType']
        });
        reply(coachs);
      } else {
        const coachs = await CoachInfo.findAll({
          where: {},
          attributes: ['id', 'sName', 'sNickName', 'iTeamId', 'iType']
        });
        reply(coachs);
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

module.exports.update_coach = {
  auth: 'jwt',
  validate: {
    payload: {
      sUnionid: Joi.string().required(),
      iTeamId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const AdminInfo = DB.getModel('tb_admin_info');
    const {sUnionid, iTeamId} = request.payload;
    try {
      if (iTeamId == -1) {
        await AdminInfo.update({iRoleId: 0, iTeamId: 0}, {where: {sUnionid: sUnionid}});
      } else {
        await AdminInfo.update({iRoleId: 3, iTeamId: iTeamId}, {where: {sUnionid: sUnionid}});
      }
      reply("success");
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

module.exports.update_first = {
  auth: 'jwt',
  validate: {
    payload: {
      iFirstChoose: Joi.number().integer(),
      iBo: Joi.number().integer(),
      iAdc: Joi.number().integer(),
      iTop: Joi.number().integer(),
      iMid: Joi.number().integer(),
      iJug: Joi.number().integer(),
      iSup: Joi.number().integer(),
      iCoach:Joi.number().integer(),
      iSubCoach:Joi.number().integer(),
      sSide: Joi.string(),
      dtAbortTime: Joi.string(),
      dtPublishTime: Joi.string(),
      sTeamName: Joi.string(),
      iTeamId: Joi.number().integer(),
      iMatchId: Joi.number().integer(),
      id: Joi.number().integer()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const TeamFirst = DB.getModel('tb_team_first');
    const AdminInfo = DB.getModel('tb_admin_info');
    const AdminUser = DB.getModel('admin_user');
    const MatchInfo = DB.getModel('tb_match_info');
    const TeamFirstDefault = DB.getModel("tb_team_first_default");
    const {iFirstChoose, iBo, iAdc, iTop, iMid, iJug, iSup,iCoach,iSubCoach, sSide, dtAbortTime, dtPublishTime, sTeamName, iTeamId, iMatchId, id} = request.payload;
    const session = request.auth.credentials;
    try {
      const uinfo = await AdminInfo.findOne({where: {sUnionid: session.username}, raw: true});
      if (!uinfo) {
        throw new Error("您的登录信息已过期，请重新登录");
      }
      const admin = await AdminUser.findOne({where: {username: session.username}, raw: true});
      if (!admin) {
        throw new Error("您的登录信息已过期，请重新登录");
      }
      const mi = await MatchInfo.findOne({where: {id: iMatchId}, raw: true});
      if (!mi) {
        throw new Error("比赛信息不存在");
      }
      let teams = mi.TeamInfo.split(",");
      if (teams.length != 2) {
        throw new Error("比赛信息有错误，请联系timmu");
      }

      let condition = {};
      let updated = {dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")};
      if (id) {
        condition = {id: id};
      } else {
        condition = {iBo: iBo, iMatchId: iMatchId, iTeamId: iTeamId};
      }
      if (iFirstChoose) {
        updated["iFirstChoose"] = parseInt(iFirstChoose);
      }
      if (iAdc) {
        updated["iAdc"] = parseInt(iAdc);
      }
      if (iTop) {
        updated["iTop"] = parseInt(iTop);
      }
      if (iMid) {
        updated["iMid"] = parseInt(iMid);
      }
      if (iJug) {
        updated["iJug"] = parseInt(iJug);
      }
      if (iSup) {
        updated["iSup"] = parseInt(iSup);
      }
      if (iCoach) {
        updated["iCoach"] = parseInt(iCoach);
      }
      if (iSubCoach) {
        updated["iSubCoach"] = parseInt(iSubCoach);
      }
      if (sTeamName) {
        updated["sTeamName"] = sTeamName;
      }
      if (iTeamId) {
        updated["iTeamId"] = parseInt(iTeamId);
      }
      if (iBo) {
        updated["iBo"] = parseInt(iBo);
      }
      if (iMatchId) {
        updated["iMatchId"] = parseInt(iMatchId);
      }
      if (sSide) {
        updated["sSide"] = sSide;
      }
      if (dtAbortTime) {
        updated["dtAbortTime"] = dtAbortTime;
      }
      if (dtPublishTime) {
        updated["dtPublishTime"] = dtPublishTime;
      }
      if (Object.keys(updated).length > 0) {
        updated["sModifyBy"] = "admin";
        updated["sModifyName"] = admin.idname;
      }
      if (!id) {
        const [data, created] = await TeamFirst.findOrCreate({where: condition, defaults: updated});
        if (!created) {
          await TeamFirst.update(updated, {where: condition});
        }
      } else {
        await TeamFirst.update(updated, {where: condition});
      }
      //对公布时间同步更新
      if(dtPublishTime){
        await TeamFirst.update({"dtPublishTime":dtPublishTime,"sModifyBy":"admin","sModifyName":admin.idname,"dtUpdateTime": moment().format("YYYY-MM-DD HH:mm:ss")}, {where: {iMatchId:iMatchId,iBo:iBo}});
      }

      //滚动更新优先选边
      if (iBo == 1 && iFirstChoose && iMatchId) {
        var current = iFirstChoose;
        for (var i = 1; i <= mi.BO; i++) {
          for (var ii = 0; ii < 2; ii++) {
            let updatedTeamId = teams[ii];
            let [data, created] = await TeamFirst.findOrCreate({
              where: {
                iMatchId: iMatchId,
                iBo: i,
                iTeamId: updatedTeamId
              },
              defaults: {
                iTeamId: updatedTeamId,
                iMatchId: iMatchId,
                iBo: i,
                iFirstChoose: current,
                sModifyBy: "admin",
                sModifyName: admin.idname,
                dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
              }
            });
            if (!created) {
              await TeamFirst.update({
                iFirstChoose: current,
                sModifyBy: "admin",
                sModifyName: admin.idname,
                dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
              }, {where: {iMatchId: iMatchId, iBo: i, iTeamId: updatedTeamId}});
            }
          }
          if (current == teams[0]) {
            current = teams[1];
          } else {
            current = teams[0];
          }
        }
      }
      //更新对面的选边情况
      if (iMatchId && sSide && iTeamId && iBo) {
        let needUpdate = 0;
        let otherSide = "";
        if (iTeamId == teams[0]) {
          needUpdate = teams[1];
        } else {
          needUpdate = teams[0];
        }
        if (sSide == "red") {
          otherSide = "blue";
        } else {
          otherSide = "red";
        }
        const [data, created] = await TeamFirst.findOrCreate({
          where: {
            iMatchId: iMatchId,
            iBo: iBo,
            iTeamId: needUpdate
          },
          defaults: {
            iMatchId: iMatchId,
            iBo: iBo,
            iTeamId: needUpdate,
            sSide: otherSide,
            sModifyBy: "admin",
            sModifyName: admin.idname,
            dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
          }
        });
        if (!created) {
          await TeamFirst.update({
            sSide: otherSide,
            sModifyBy: "admin",
            sModifyName: admin.idname,
            dtUpdateTime: moment().format("YYYY-MM-DD HH:mm:ss")
          }, {where: {iMatchId: iMatchId, iBo: iBo, iTeamId: needUpdate}});
        }
      }
      //更新默认首发名单
      if (updated["iTeamId"]) {
        let updateDefaultFirst = {};
        if (iAdc) {
          updateDefaultFirst["iAdc"] = parseInt(iAdc);
        }
        if (iTop) {
          updateDefaultFirst["iTop"] = parseInt(iTop);
        }
        if (iMid) {
          updateDefaultFirst["iMid"] = parseInt(iMid);
        }
        if (iJug) {
          updateDefaultFirst["iJug"] = parseInt(iJug);
        }
        if (iSup) {
          updateDefaultFirst["iSup"] = parseInt(iSup);
        }
        if (iCoach) {
          updateDefaultFirst["iCoach"] = parseInt(iCoach);
        }
        if (iSubCoach) {
          updateDefaultFirst["iSubCoach"] = parseInt(iSubCoach);
        }
        if (Object.keys(updateDefaultFirst).length != 0) {
          updateDefaultFirst["iTeamId"] = updated["iTeamId"];
          updateDefaultFirst["dtUpdateTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
          const [data1, created1] = await TeamFirstDefault.findOrCreate({
            where: {iTeamId: updated["iTeamId"]},
            defaults: updateDefaultFirst
          });
          if (!created1) {
            await TeamFirstDefault.update(updateDefaultFirst, {where: {iTeamId: updated["iTeamId"]}});
          }
        }
      }
      reply("success");
    } catch (err) {
      console.log(err);
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};
