'use strict';
const Joi = require('joi');
const Boom = require('boom');
const moment = require('moment');
const service_gamedatabase = require('../../rpc/gamedatabase');
const service_matchdatabase = require('../../rpc/matchdatabase');
const server_wonderful_match = require('../../service/wonderful_match');
const { getObjects, signatureUrl, copyObjectFromPrivateToStatic } = require('../../lib/file');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

module.exports.query = {
  auth: 'jwt',
  description: 'query',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { key, matchID, BO } = request.query;
    const obj = {
      matchID: matchID,
      BO: BO
    };
    try {
      let ret = await getObjects(key);
      let tmpArr = [];
      if (ret && ret.length) {
        ret.forEach(item => {
          let f = false;
          let tmp = {};
          let itemKey = item.Key.split('.');
          let key = itemKey[1];
          tmpArr.forEach(t => {
            if (t.id == itemKey[0]) {
              tmp = t;
              f = true;
            }
          });
          tmp.id = itemKey[0];
          tmp.key = itemKey[0];
          tmp[key] = item.Key;
          if (!f) {
            tmpArr.push(tmp);
          }
        });
      }
      let result = [];
      let rseultTmp = {};
      const game = await service_gamedatabase.GetPlatformGameIDByBO(obj); // 获取团战接口的入参
      if (tmpArr && tmpArr.length) {
        for (let i in tmpArr){
          const urlgif = await signatureUrl(`${tmpArr[i].key}.gif`);
          const urljpg = await signatureUrl(`${tmpArr[i].key}.jpg`);
          result.push({
            urlgif: urlgif,
            urljpg: urljpg,
            id: `${tmpArr[i].key}.gif`,
            platformGameID: game && game.data && game.data.platformGameID || '',
            matchID: obj.matchID,
            BO: obj.BO
          });
        }
      }
      if (game.success && game.data) {
        let data = game.data;
        const tmp = {
          platformGameID: data.platformGameID,
          region: data.region,
        };

        const basic = await service_gamedatabase.GetBattlesBasicData(tmp); // 团战接口里面的 选手ID 和 teamID
        const playersBasic = await service_gamedatabase.GetTeamsAndPlayersBasic(tmp); // 队伍和选手基本数据
        const MatchTime  = await service_gamedatabase.GetGameBasicInfo(tmp); // 比赛的开始时间存在，结束时间不存在，进行中，开始时间和结束时间都存在已经结束
        // const ChampionBasic = await service_gamedatabase.GetPlayersBasicInGame(tmp); // 选手比赛基础信息
        // if (ChampionBasic.success) {
        //   rseultTmp.ChampionBasic = ChampionBasic.data;
        // }
        rseultTmp.playersBasic = playersBasic.data;
        rseultTmp.matchTime = MatchTime.data;
        rseultTmp.basic = basic.data;
        rseultTmp.matchJIF = result;
      }
      reply(new SuccessModel(rseultTmp));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

// 查询开始赛季
module.exports.querySeason = {
  auth: 'jwt',
  description: 'query',
  handler: async function (request, reply) {
    let params = {
      iOpen: 1
    };
    try {
      const ret = await service_matchdatabase.QuerySeason(params);
      reply(new SuccessModel(ret));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

// 根据赛季查询赛程
module.exports.queryMatchs = {
  auth: 'jwt',
  description: 'query',
  handler: async function (request, reply) {
    const { seasonID, pageSize, matchStart } = request.query;
    try {
      const ret = await service_matchdatabase.getMatchs(seasonID, matchStart);
      reply(ret)
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

// gif 图片储存到公开的数据库内
module.exports.saveCloudService = {
  auth: 'jwt',
  description: 'saveCloudService',
  handler: async function (request, reply) {
    let { key, pngkey, size, gifkey, title, status, matchID, platformGameID, BO, startTime, endTime, matchName } = request.payload;
    let toKey = `matchGif/${matchID}/${BO}/${size}`;
    const params = {
      keyPic: toKey,
      status,
      title,
      matchID,
      platformGameID,
      BO,
      startTime: Number(startTime),
      endTime: Number(endTime),
      matchName
    }
    try {
      // static.tjstats.com/ 公司域名
      await copyObjectFromPrivateToStatic(pngkey, `${toKey}.jpg`);
      await copyObjectFromPrivateToStatic(gifkey, `${toKey}.gif`);
      const rest = await server_wonderful_match.queryOne(request.server, toKey);
      if (rest && rest.keyPic) {
        await server_wonderful_match.update(request.server, params);
      } else {
        await server_wonderful_match.save(request.server, params);
      }
      reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

// 根据key 查询
module.exports.queryAll = {
  auth: 'jwt',
  description: 'queryAll',
  handler: async function (request, reply) {
    try {
      const ret = await server_wonderful_match.queryAll(request.server);
      reply(new SuccessModel(ret));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};










