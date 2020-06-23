'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const matchDataBase = require('../../rpc/matchdatabase');
const gameDataBase = require('../../rpc/gamedatabase');


//获取所有正在进行的对局
module.exports.get_all_online_games = {
  auth: 'jwt',
  validate: {
    payload: {
      region: Joi.string().min(0).max(10)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {region} = request.payload;
    try {
      let response = await gameDataBase.getOnlineGames(region);
      if (!response.success) {
        throw new Error(response.errMsg);
      } else {
        reply(response.data);
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

//根据赛事id已经比赛开始时间获取赛程
module.exports.get_matchs_by_season_and_date = {
  auth: 'jwt',
  validate: {
    payload: {
      seasonID: Joi.number().integer(),
      matchStart: Joi.string().min(0).max(10),
      teamID: Joi.number().integer(),
      cityCode: Joi.number().integer(),
      page: Joi.number().integer(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {seasonID, matchStart, teamID, cityCode, page} = request.payload;
    try {
      const DB = request.getDb(process.env.DB_DBNAME);
      const MatchGameRel = DB.getModel('tb_match_game_rel');
      let response = await matchDataBase.getMatchs(seasonID, matchStart, teamID, cityCode, page);
      if (!response.success) {
        throw new Error(response.errMsg);
      } else {
        let matchLives = [];
        for (var i in response.data.rows) {
          let match = response.data.rows[i];
          let t100 = await matchDataBase.getPlayers(match.TeamInfos[0].id);
          let t200 = await matchDataBase.getPlayers(match.TeamInfos[1].id);
          if(!t100.success){
            continue;
          }
          if(!t200.success){
            continue;
          }
          let players = {};
          for(var p in t100.data){
            players[t100.data[p]["id"]] = t100.data[p];
          }
          for(var p1 in t200.data){
            players[t200.data[p1]["id"]] = t200.data[p1];
          }

          for (var n = 1; n <= match.BO; n++) {
            let vsinfo = match.TeamInfos[0].TeamDes + " vs " + match.TeamInfos[1].TeamDes;
            let teams = {};
            teams[match.TeamInfos[0].id] = match.TeamInfos[0];
            teams[match.TeamInfos[1].id] = match.TeamInfos[1];
            let tmp = {
              id: match.id,
              location: match.MatchLocation,
              bo: match.BO,
              currBo: n,
              vsInfo: vsinfo,
              start: match.MatchStart,
              sModifyName:match.sModifyName,
              dtLastModifyTime:match.dtLastModifyTime,
              teams:teams,
              players:players,
            };

            let rel = await MatchGameRel.findOne({where: {MatchId: match.id, iBo: n}});
            if (rel) {
              tmp["platformGameId"] = rel.PlatformGameId;
              tmp["startTime"] = rel.StartTime;
              tmp["endTime"] = rel.EndTime;
              tmp["iWin"] = rel.iWin;
              tmp["gameName"] = rel.GameName;
              tmp["mvp"] = rel.iMvp;
              tmp["stream"] = rel.sStream;
            } else {
              tmp["platformGameId"] = "";
              tmp["startTime"] = "";
              tmp["endTime"] = "";
              tmp["iWin"] = 0;
              tmp["gameName"] = "";
              tmp["mvp"] = 0;
              tmp["stream"] = "";
            }
            if(tmp["iWin"]){
              if(match.TeamInfos[0].id == tmp["iWin"]){
                tmp["winTeam"] = match.TeamInfos[0].TeamDes;
              }else{
                tmp["winTeam"] = match.TeamInfos[1].TeamDes;
              }
            }else{
              tmp["winTeam"] = "-";
            }
            if(tmp["mvp"] != 0 && tmp["iWin"] != 0){
              tmp["sMvp"] = players[tmp["mvp"]]["GameName"];
            }else{
              tmp["sMvp"] = "请选择";
            }
            matchLives.push(tmp);
          }
        }
        reply({rows:matchLives,count:response.data.count});
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      console.log(err);
      reply(err);
    }
  }
};




//修改对局信息
module.exports.modify_game_rel = {
  auth: 'jwt',
  validate: {
    payload: {
      iMatchId: Joi.number().integer().required(),
      iBo: Joi.number().integer().required(),
      platformGameId: Joi.string(),
      gameName: Joi.string(),
      mvp: Joi.number().integer().default(0),
      stream:Joi.string(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const MatchGameRel = DB.getModel('tb_match_game_rel');
    const AdminUser = DB.getModel('admin_user');
    const {iMatchId, iBo, platformGameId, gameName, mvp,stream} = request.payload;
    const session = request.auth.credentials;
    try {
      const admin = await AdminUser.findOne({where: {username: session.username}, raw: true});
      if (!admin) {
        throw new Error("您的登录信息已过期，请重新登录");
      }

      let updated = {};
      if (platformGameId) {
        updated["PlatformGameId"] = platformGameId;
      }
      if (gameName) {
        updated["GameName"] = gameName;
      }
      if (mvp) {
        updated["iMvp"] = mvp;
      }
      if(stream){
        updated["sStream"] = stream;
      }
      if (updated.length > 0){
        updated["sModifyName"] = admin.idname;
        updated["dtLastModifyTime"] = moment().format("YYYY-MM-DD HH:mm:ss");
      }
      await MatchGameRel.update(updated, {where: {MatchId: iMatchId, iBo: iBo}});
      reply("success");
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

//审核对局信息
module.exports.valid_game_rel = {
  auth: 'jwt',
  validate: {
    payload: {
      matchID: Joi.number().integer().required(),
      iBo: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {matchID, iBo} = request.payload;
    try {
      const DB = request.getDb(process.env.DB_DBNAME);
      const MatchGameRel = DB.getModel('tb_match_game_rel');
      await MatchGameRel.update({isValid: 1}, {where: {MatchId: matchID, iBo: iBo}});
      reply("success");
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};
