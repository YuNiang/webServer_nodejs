'use strict';
const Joi = require('joi');
const Boom = require('boom');
const Excel = require('exceljs');
const service_tb_player_info = require('../../service/tb_player_info');
const service_tb_coach_info = require('../../service/tb_coach_info');
const service_audit_order = require('../../service/audit_order');
const service_season_info = require('../../service/tb_season_info');
const service_oper_log = require('../../service/oper_log');
const service_tb_player_info_action = require('../../service/tb_player_info_action');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const service_ec_team_info = require('../../service/ec_team_info');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * query
 */
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
    const { teamID } = request.auth.credentials;
    const { page, pageSize, activeName, NameCn, TeamID, IDNumber, Passport } = request.query;
    // type 为： external 俱乐部人员 外部
    let params = {};
    if (TeamID) {
      params.TeamID = TeamID;
    }
    if (NameCn) {
      params.NameCn = NameCn;
    }
    //强制战队管理员只能使用本队id
    if(teamID){
      params.TeamID = teamID;
    }

    if (IDNumber) {
      params.IDNumber = IDNumber;
    }
    if (Passport) {
      params.Passport = Passport;
    }
    if (request.query.CreatedAt != null) {
      params.CreatedAt = {
        $gte: new Date(request.query.CreatedAt),
        $lt: new Date(new Date(request.query.CreatedAt).getTime() + 86400000)
      };
    }
    try {
      if (activeName == 'player') {
        const playerData = await service_tb_player_info.query(request.server, params, page, pageSize);
        reply(new SuccessModel(playerData));
      } else if (activeName == 'coach') {
        const coachData = await service_tb_coach_info.query(request.server, params, page, pageSize);
        reply(new SuccessModel(coachData));
      }
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

/**
 * queryById
 */
module.exports.queryById = {
  auth: 'jwt',
  description: 'query by id',
  validate: {
    query: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { teamID, teamGroup } = request.auth.credentials;
    const { id, activeName } = request.query;
    try {
      if (activeName == 'player') {
        // 兼容从老系统同步过来的数据 teamID, teamGroup
        const ret = await service_tb_player_info.queryOneWithFile(request.server, id ,teamID, teamGroup);
        reply(new SuccessModel(ret));
      }
      if (activeName == 'coach') {
        const ret = await service_tb_coach_info.queryOneWithFile(request.server, id, teamID, teamGroup);
        reply(new SuccessModel(ret));
      }
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 转会期间时间
 */
module.exports.queryTransferTime = {
  auth: 'jwt',
  description: 'queryTransferTime',

  handler: async function (request, reply) {
    try {
      const data = await service_season_info.getMatchTime(request.server);
      reply(new SuccessModel(data));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 查询通过
 */
module.exports.querySkillPoint = {
  auth: 'jwt',
  description: 'querySkillPoint',
  handler: async function (request, reply) {
    const { teamID } = request.auth.credentials;
    let { iType } = request.query;
    if (iType == '120' || iType == '180') {
      iType = '120, 180';
    }
    try {
      const count = await service_tb_player_info.queryTeamAction(teamID, iType);
      reply(new SuccessModel(count));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    }
  }
};

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  description: 'save',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;

    let params = request.payload;
    let id = 0;
    if(params.id){
      id = params.id;
    }
    params.TeamID = teamID;
    params.TeamGroup = teamGroup;
    params.CreatedAt = new Date();
    params.CreateOperID = `${UID}/${nickname || username}`;
    params.ActionType = '100';
    try {
      //转会选手，更新转会步骤
      if (params.id && params.PlayerRole == '4') {
        service_tb_player_info_action.updateStep(request.server, params.id);
      }
      if (params.id && params.PlayerRole != '4') {
        await service_tb_player_info.updateInfo(request.server, params.id, params);
      } else {
        params.id = null;
        const ret = await service_tb_player_info.save(request.server, params);
        id = ret.id;
      };
      let extList = [];
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo'
            && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete') {
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });
      if (params.fileData && params.fileData.length) {
        params.fileData.forEach(f => {
          extList.push({
            extKey: `f_${f.TemplateID}`,
            extValue: f.ExtValue,
            ext: f.ExpireAt,
            AuditError: (f.errorInfo) ? -1 : 0,
            AuditReason: f.errorInfo
          });
        });
      };
      let orderData = {
        OuterID: id,
        iType: '100',
        CreatedAt: new Date(),
        CreateOperID: `${UID}/${nickname || username}`,
        isActive: params.isActive,
        TeamID: params.TeamID,
        TeamGroup: params.TeamGroup
      };
      if(params.AuditStatus != null){
        orderData.AuditStatus = params.AuditStatus;
      }
      if (extList.length) {
        orderData.ext = extList;
      };
      let msg = '已提交';
      if (params.isActive == 1) {
        if (params.orderID) {
          const o = service_audit_order.queryOne(request.server, params.orderID);
          if (o && o.AuditStatus == -1) {
            msg = '已提交';
          }
        }
      };
      if (params.orderID) {
        //只有在非预览页面才去更新数据库
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
      };
      if (params.isActive == 1) {
        const objLog = {
          Type: '100',
          OperID: `${UID}/${nickname || username}`,
          OuterID: id,
          OrderID: params.orderID,
          CreatedAt: new Date(),
          Desc: msg
        };
        await service_oper_log.save(request.server, objLog);
      };
      reply(new SuccessModel({ id:id, orderID: params.orderID }));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

/**
 * saveEnd 终止工单
 */
module.exports.saveEnd = {
  auth: 'jwt',
  description: 'save',
  handler: async function (request, reply) {
    const { UID, nickname, username } = request.auth.credentials;
    let params = request.payload;
    params.CreatedAt = new Date();
    params.CreateOperID = `${UID}/${nickname || username}`;
    try {
      if (params.iType == '100' && params.id) {
        await service_tb_player_info.delInfo(request.server, params.id);
      }
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, {
          UpdatedAt: new Date(),
          AuditedAt: new Date(),
          AuditOperID: params.CreateOperID,
          isActive: -1
        });
        if (params.iType == '180' || params.iType == '190') {
          service_tb_player_info.delTeamAction(request.server, {
            PlayerID: params.id,
            iType: params.iType
          });
        }
      }
      const objLog = {
        Type: params.iType,
        // OperID: `${UID}/${nickname || username}`,
        OuterID: params.id,
        OrderID: params.orderID,
        AuditOperID: `${UID}/${nickname || username}`,
        CreatedAt: new Date(),
        AuditedAt: new Date(),
        Desc: '终止工单'
      };
      await service_oper_log.save(request.server, objLog);
      reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

/**
 * update
 */
module.exports.update = {
  auth: 'jwt',
  description: 'update',
  handler: async function (request, reply) {
    let params = request.payload;
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    params.UpdatedAt = new Date();
    params.UpdateOperID = `${UID}/${nickname || username}`;
    params.TeamID = teamID;
    params.TeamGroup = teamGroup;
    // 选手修改 iType  170
    try {
      // const checkOrder = await service_audit_order.queryAuditingByOuterId(params.id, '110,120,130,140,180,190');
      // if (checkOrder.length) {
      //   return reply(new ErrorModel({ message: '当前用户存在其他工单，请联系管理员' }));
      // }

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.id, teamID, '170');

      const checkUpdateOrder = await service_audit_order.queryAuditingByOuterId(params.id, '170');
      if (checkUpdateOrder.length) {
        params.orderID = checkUpdateOrder[0].id;
      }
      let extList = [];
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo'
          && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'){
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });

      params.fileData && params.fileData.length && params.fileData.forEach(d => {
        extList.push({
          extKey: `f_${d.TemplateID}`,
          extValue: d.ExtValue,
          extOldValue: d.ExtValue,
          ext: d.ExpireAt,
          AuditError: (d.errorInfo) ? -1 : 0,
          AuditReason: d.errorInfo
        });
      });
      let orderData = {
        OuterID: params.id,
        iType: '170',
        CreatedAt: new Date(),
        CreateOperID: params.UpdateOperID,
        UpdatedAt: new Date(),
        isActive: params.isActive,
        TeamID: params.TeamID,
        TeamGroup: params.TeamGroup
      };
      if(params.AuditStatus != null) {
        orderData.AuditStatus = params.AuditStatus;
      }
      if (extList.length) {
        orderData.ext = extList;
      }
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
      }
      if (params.isActive == 1) {
        const objLog = {
          Type: '170',
          OperID: `${UID}/${nickname || username}`,
          OuterID: params.id,
          OrderID: params.orderID,
          CreatedAt: new Date(),
          Desc: '已提交'
        };
        await service_oper_log.save(request.server, objLog);
      }
      reply(new SuccessModel({ id: params.id, orderID: params.orderID }));
    } catch (err) {
      console.log(err, 'err');
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 选手过滤
 */
module.exports.filterPlayer = {
  auth: 'jwt',
  description: 'query',
  handler: function (request, reply) {
    const { teamID } = request.auth.credentials;
    const { iType } = request.query;
    if (teamID) {
      service_tb_player_info.filterPlayer(request.server, teamID, iType).then(data => {
        reply(new SuccessModel(data));
      }).catch(err => {
        // eslint-disable-next-line curly
        if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
        reply(new ErrorModel());
      });
    } else {
      reply(new ErrorModel({ message: '缺少 TeamID 参数！' }));
    }
  }
};

/**
 * 选手上调
 */
module.exports.saveUp = {
  auth: 'jwt',
  description: 'saveUp',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    let params = request.payload;
    params.username = `${UID}/${nickname || username}`;
    params.TeamID = teamID;
    params.TeamGroup = teamGroup;
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, '120', params.orderID);

      let extList = [];
      extList.push({
        extKey: `TeamID`,
        extValue: params.TeamID
      });
      extList.push({
        extKey: `TeamGroup`,
        extValue: params.TeamGroup
      });
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
          && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'){
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          })
        }
      })
      if (params.newInfo.fileData && params.newInfo.fileData.length) {
        params.newInfo.fileData.forEach(f => {
          extList.push({
            extKey: `f_${f.TemplateID}`,
            extValue: f.ExtValue,
            ext: f.ExpireAt || new Date(),
            AuditError: (f.errorInfo) ? -1 : 0,
            AuditReason: f.errorInfo
          });
        });
      }
      let orderData = {
        AuditStatus: 0,
        isActive: 1,
        OuterID: params.OuterID,
        iType: '120',
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        CreateOperID: `${UID}/${nickname || username}`,
        TeamID: params.TeamID,
        TeamGroup: params.TeamGroup,
        ext: extList
      };
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
        // 并且插入数据 tb_player_info_action 来控制3条通道
        let list = {
          PlayerID: params.OuterID,
          newTeamGroup: teamGroup == '1' ? '2' : '1',
          oldTeamGroup: teamGroup,
          newTeamID: teamID,
          oldTeamID: teamID,
          iType: '120',
          CreatedAt: new Date()
        };
        await service_tb_player_info_action.save(request.server, list);
      }
      const objLog = {
        Type: '120',
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.OuterID,
        orderID: params.orderID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Desc: '上调申请'
      };
      await service_oper_log.save(request.server, objLog);
      return reply(new SuccessModel());
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 选手借调 同上调逻辑一致
 */
module.exports.saveBorrow = {
  auth: 'jwt',
  description: 'save',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    let params = request.payload;
    params.username = `${UID}/${nickname || username}`;
    params.TeamID = teamID;
    params.TeamGroup = teamGroup;
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, '180', params.orderID);

      let extList = [];
      extList.push({
        extKey: `TeamGroup`,
        extValue: params.TeamGroup,
        extOldValue: teamGroup
      });
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
          && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'
          && e != 'TeamGroup') {
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });
      if (params.newInfo.fileData && params.newInfo.fileData.length) {
        params.newInfo.fileData.forEach(f => {
          extList.push({
            extKey: `f_${f.TemplateID}`,
            extValue: f.ExtValue,
            ext: f.ExpireAt || new Date(),
            AuditError: (f.errorInfo) ? -1 : 0,
            AuditReason: f.errorInfo
          });
        });
      }
      let orderData = {
        AuditStatus: 0,
        isActive: 1,
        OuterID: params.OuterID,
        iType: params.iType,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        CreateOperID: `${UID}/${nickname || username}`,
        TeamID: params.TeamID,
        TeamGroup: params.TeamGroup,
        ext: extList
      };
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
        // 并且插入数据 tb_player_info_action 来控制3条通道
        let list = {
          PlayerID: params.OuterID,
          oldTeamGroup: teamGroup,
          newTeamID: teamID,
          oldTeamID: teamID,
          newTeamGroup: params.TeamGroup,
          iType: params.iType,
          CreatedAt: new Date()
        };
        await service_tb_player_info_action.save(request.server, list);
      }
      const objLog = {
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.OuterID,
        orderID: params.orderID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Desc: '借调申请'
      };
      await service_oper_log.save(request.server, objLog);
      return reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 选手下放 不占通过，每个季度只有3次机会， 只有LPL经理 才可以触发动作
 */
module.exports.saveDown = {
  auth: 'jwt',
  description: 'saveDown',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    const params = request.payload;
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, '140', params.orderID);

      let extList = [];
      extList.push({
        extKey: 'TeamGroup',
        extValue: '2',
        extOldValue: teamGroup
      });

      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
          && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'){
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });
      if (params.newInfo.fileData && params.newInfo.fileData.length) {
        params.newInfo.fileData.forEach(f => {
          extList.push({
            extKey: `f_${f.TemplateID}`,
            extValue: f.ExtValue,
            ext: f.ExpireAt || new Date(),
            AuditError: (f.errorInfo) ? -1 : 0,
            AuditReason: f.errorInfo
          });
        });
      }
      let orderData = {
        AuditStatus: 0,
        isActive: 1,
        OuterID: params.OuterID,
        iType: params.iType,
        TeamID: teamID,
        TeamGroup: teamGroup,
        CreatedAt: new Date(),
        CreateOperID: `${UID}/${nickname || username}`,
        ext: extList
      };
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
        let list = {
          PlayerID: params.OuterID,
          newTeamGroup: teamGroup == '1' ? '2' : '1',
          oldTeamGroup: teamGroup,
          newTeamID: teamID,
          oldTeamID: teamID,
          iType: params.iType,
          CreatedAt: new Date()
        };
        await service_tb_player_info_action.save(request.server, list);
      }
      const objLog = {
        UpdatedAt: new Date(),
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.OuterID,
        OrderID: params.orderID,
        CreatedAt: new Date(),
        Desc: '选手下放'
      };
      await service_oper_log.save(request.server, objLog);
      reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

 /**
 * 选手转会 每个季度只能转一次  1.是否在转会时间内 2. 转会期间内只能操作一次转会
 */
module.exports.saveTransfer = {
  auth: 'jwt',
  description: 'save',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup  } = request.auth.credentials;
    let extList = [];
    let params = request.payload;
    params.newTeamGroup = params.TeamGroup;
    params.newTeamID = params.TeamID;
    params.oldTeamGroup = teamGroup;
    params.oldTeamID = teamID;
    extList.push({
      extKey: 'TeamGroup',
      extValue: params.newTeamGroup,
      extOldValue: params.oldTeamGroup
    });
    extList.push({
      extKey: 'TeamID',
      extValue: params.newTeamID,
      extOldValue: params.oldTeamID
    });
    Object.keys(params).forEach(e => {
      if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
        && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'
        && e != 'TeamGroup' && e != 'TeamID'){
        extList.push({
          extKey: e,
          extValue: params[e],
          AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
          AuditReason: params.errorInfo ? params.errorInfo[e] : null
        });
      }
    });
    if (params.newInfo.fileData && params.newInfo.fileData.length) {
      params.newInfo.fileData.forEach(f => {
        extList.push({
          extKey: `f_${f.TemplateID}`,
          extValue: f.ExtValue,
          ext: f.ExpireAt || new Date(),
          AuditError: (f.errorInfo) ? -1 : 0,
          AuditReason: f.errorInfo
        });
      });
    }
    let orderData = {
      AuditStatus: 0,
      OuterID: params.OuterID,
      TeamID: params.oldTeamID,
      TeamGroup: params.oldTeamGroup,
      UpdatedAt: new Date(),
      CreatedAt: new Date(),
      isActive: 1,
      iType: params.iType,
      CreateOperID: `${UID}/${nickname || username}`,
      ext: extList
    };
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, '130', params.orderID);

      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
      }
      const objLog = {
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.OuterID,
        CreatedAt: new Date(),
        OrderID: params.orderID,
        Desc: '选手转会'
      };
      await service_oper_log.save(request.server, objLog);
      return reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      return reply(new ErrorModel(err));
    }
  }
};

 /**
 * 选手解约 / 教练解约
 */
module.exports.saveRescission = {
  auth: 'jwt',
  description: 'saveRescission',
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    let params = request.payload;
    let extList = [];
    Object.keys(params).forEach(e => {
      if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
        && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'){
        extList.push({
          extKey: e,
          extValue: params[e],
          AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
          AuditReason: params.errorInfo ? params.errorInfo[e] : null
        });
      }
    });
    if (params.newInfo.fileData && params.newInfo.fileData.length) {
      params.newInfo.fileData.forEach(f => {
        extList.push({
          extKey: `f_${f.TemplateID}`,
          extValue: f.ExtValue,
          ext: f.ExpireAt || new Date(),
          AuditError: (f.errorInfo) ? -1 : 0,
          AuditReason: f.errorInfo
        });
      });
    }
    let orderData = {
      AuditStatus: 0,
      isActive: 1,
      TeamGroup: teamGroup,
      TeamID: teamID,
      OuterID: params.OuterID,
      iType: params.iType, // iType 教练解约 160, 选手解约 110
      CreatedAt: new Date(),
      CreateOperID: `${UID}/${nickname || username}`,
      ext: extList
    };
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, params.iType, params.orderID);

      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
      }
      const objLog = {
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.OuterID,
        OrderID: params.orderID,
        CreatedAt: new Date(),
        Desc: params.iType == '160' ? '教练解约' : '选手解约'
      };
      await service_oper_log.save(request.server, objLog);
      reply(new SuccessModel({ orderID: params.orderID }));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

//管理员返还操作
module.exports.saveBackByAdmin = {
  auth: 'jwt',
  description: 'saveBackByAdmin',
  validate: {
    payload: {
      PlayerID: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { UID, nickname, username} = request.auth.credentials;
    let params = request.payload;
    const DB = request.getDb(process.env.DB_DBNAME);
    const PlayerInfo = DB.getModel('tb_player_info');
    const PlayInfoAction = DB.getModel('tb_player_info_action');
    const AuditOrder = DB.getModel('Auditorder');//工单数据表
    try {
      let player = await PlayerInfo.findOne({where: {id: params.PlayerID},raw: true});
      if(!player){
        return reply(new ErrorModel("指定选手不存在！"));
      }
      //检查是否存在返还工单
      const order = await AuditOrder.findOne({where:{OuterID:params.PlayerID,iType:190,AuditStatus:0}});
      if(order){
        return reply(new ErrorModel("该选手存在返还工单，请在审核中通过返还！"));
      }

      //更新队伍信息
      const club = await service_ec_team_info.ClubInfo(player.TeamID);
      if(club.LDL == 0){
        return reply(new ErrorModel("俱乐部下的LDL俱乐部不存在！"));
      }
      //检查是否是借调选手
      let actions = await PlayInfoAction.findOne({where: {PlayerID: params.PlayerID,iType:180,IsDelete:1},raw: true});
      if(!actions){
        return reply(new ErrorModel("指定选手不是借调选手，不可被返还！"));
      }
      //将选手信息更新掉，
      await PlayerInfo.update({TeamID:club.LDL,TeamGroup:2,ActionType:0},{where: {id: params.PlayerID}});
      //将选手状态表里的借调记录更新为删除状态。
      await service_tb_player_info.delTeamAction(request.server, {
        PlayerID: params.PlayerID,
        iType:[190,180]
      });

      const objLog = {
        Type: 190,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.PlayerID,
        orderID: 0,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Desc: '管理员返还执行'
      };
      await service_oper_log.save(request.server, objLog);
      return reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

 /**
 * 选手返回 返回3个通道的技能点
 */
module.exports.saveBack = {
  auth: 'jwt',
  description: 'saveBack',
  validate: {
    payload: {
      PlayerID: Joi.number().integer().required(),
      iType: Joi.string().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { UID, nickname, username, teamID} = request.auth.credentials;
    let params = request.payload;
    const DB = request.getDb(process.env.DB_DBNAME);
    const PlayerInfo = DB.getModel('tb_player_info');
    const PlayInfoAction = DB.getModel('tb_player_info_action');
    try {

      // check permission
      await service_tb_player_info.checkClubPermission(request.server, params.OuterID, teamID, '190');

      //验证获取俱乐部信息
      const club = service_ec_team_info.ClubInfo(teamID);
      if(club.LDL == 0){
        return reply(new ErrorModel("俱乐部下的LDL战队不存在！"));
      }
      //检查是否是借调选手
      let actions = await PlayInfoAction.findOne({where: {PlayerID: params.PlayerID,iType:180,IsDelete:1},raw: true});
      if(!actions){
        return reply(new ErrorModel("指定选手不是借调选手，不可被返还！"));
      }

      let extList = [];
      extList.push({
        extKey: `TeamGroup`,
        extValue: '1',
        extOldValue: '2'
      });
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' && e!='newInfo'
          && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'
          && e != 'TeamGroup') {
          extList.push({
            extKey: e,
            extValue: params[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });
      let orderData = {
        AuditStatus: 0,
        isActive: 1,
        OuterID: params.PlayerID,
        iType: 190,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        CreateOperID: `${UID}/${nickname || username}`,
        TeamID: teamID,
        TeamGroup: '1',
        ext: extList
      };
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
        let list = {
          PlayerID: params.PlayerID,
          newTeamID: club.LDL,
          oldTeamID: club.LPL,
          newTeamGroup: 2,
          oldTeamGroup: 1,
          iType: params.iType,
          CreatedAt: new Date()
        };
        await service_tb_player_info_action.save(request.server, list);
      }
      const objLog = {
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.PlayerID,
        orderID: params.orderID,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Desc: '返还申请'
      };
      await service_oper_log.save(request.server, objLog);
      return reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    }
  }
};

 /**
 * 查找当前的俱乐部下的队伍人数
  * 传入任意队伍id
 */
module.exports.queryTeamCount = {
  auth: 'jwt',
  description: 'queryTeamCount',
  validate: {
    query: {
      TeamID: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { teamID } = request.auth.credentials;
    const { TeamID: extTeamID, activeName } = request.query;
    const TeamID = teamID || extTeamID;
    try {
      let club = await service_ec_team_info.ClubInfo(TeamID);
      if (activeName == 'player') {
        let data = {
          LPLCount: 0,
          LPLID: 0,
          LDLCount: 0,
          LDLID: 0,
          BorrowCount: 0
        };
        //统计借调选手信息
        let orderPlayerCnt = 0;
        if(club.LPL != 0){
          let sql = `select count(*) as total from tb_player_info where TeamID = ${club.LPL} and ActionType = 180 and IsDelete = 1`;
          const orderPlayers = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
          if(orderPlayers){
            orderPlayerCnt = orderPlayers[0]['total'];
          }
        }

        if(club.LPL != 0){
          const lpl = await service_tb_player_info.queryTeamCount(request.server, club.LPL );
          data.LPLCount = lpl - Number(orderPlayerCnt) ;
          data.LPLID = club.LPL;
        }
        if(club.LDL != 0){
          const ldl = await service_tb_player_info.queryTeamCount(request.server, club.LDL );
          data.LDLCount = Number(ldl) + Number(orderPlayerCnt);
          data.LDLID = club.LDL;
        }
        data.BorrowCount = Number(orderPlayerCnt);

        reply(new SuccessModel(data));
      } else if (activeName == 'coach') {
        let data = {
          LPLCount: 0,
          LPLID:0,
          LDLCount: 0,
          LDLID:0,
        };
        if(club.LPL != 0){
          const lpl = await service_tb_coach_info.queryTeamCount(request.server, club.LPL );
          data.LPLCount = lpl;
          data.LPLID = club.LPL;
        }
        if(club.LDL != 0){
          const ldl = await service_tb_coach_info.queryTeamCount(request.server, club.LDL );
          data.LDLCount = ldl;
          data.LDLID = club.LDL;
        }
        reply(new SuccessModel(data));
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    }
  }
};

 /**
 * 查保存到草稿箱的所有数据
 */
module.exports.queryOrderWithAllData = {
  auth: 'jwt',
  description: 'queryOrderWithAllData',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const { teamID, teamGroup } = request.auth.credentials;
    const { page, pageSize, AuditStatus, iType, activeName, id, isActive, type, TeamID: extTeamID } = request.query;
    const TeamID = teamID || extTeamID;
    let params = {};
    if (TeamID) {
      params.TeamID = TeamID;
      params.TeamGroup = teamGroup;
    }
    if (AuditStatus) {
      params.AuditStatus = AuditStatus;
    }
    if (iType) {
      params.iType = iType;
    }
    if (id) {
      params.id = id;
    }
    if (isActive) {
      params.isActive = isActive;
    }
    if (TeamID) {
      params.TeamID = TeamID;
    }
    //俱乐部强制使用本队teamid
    if (teamID) {
      params.TeamID = teamID;
      params.TeamGroup = teamGroup;
    }
    service_audit_order.queryOrderWithAllData(request.server, params, activeName, page, pageSize).then(ret => {
      reply(new SuccessModel(ret));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

module.exports.queryExcel = {
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
    const { teamID } = request.auth.credentials;
    const { page, pageSize, activeName, NameCn, TeamID: extTeamID } = request.query;
    const TeamID = teamID || extTeamID;
    let params = {};
    if (NameCn) {
      params.NameCn = NameCn;
    }
    if (TeamID) {
      params.TeamID = TeamID;
    }
    if (request.query.CreatedAt != null) {
      params.CreatedAt = {
        $gte: new Date(request.query.CreatedAt),
        $lt: new Date(new Date(request.query.CreatedAt).getTime() + 86400000)
      };
    }
    try {
      let teamInfoMap = {};
      let teamInfo = await service_ec_team_info.query();
      teamInfo && teamInfo.length && teamInfo.forEach(item => {
        teamInfoMap[item.id] = item;
      });
      if (activeName == 'player') {
        const playerData = await service_tb_player_info.query(request.server, params, page, pageSize);
        const data = playerData.rows;
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My players');
        worksheet.columns = [
          { header: '序号', key: 'id', width: 10 },
          { header: '身份证号码', key: 'IDNumber', width: 32 },
          { header: '护照号码', key: 'Passport', width: 10, outlineLevel: 1 },
          { header: '姓名（中文）', key: 'NameCn', width: 10 },
          { header: '姓名（英文）', key: 'NameEn', width: 32 },
          { header: '生日', key: 'Birthday', width: 10, outlineLevel: 1 },
          { header: '国家地区', key: 'Country', width: 10, outlineLevel: 1 },
          { header: '合同开始时间', key: 'ContractStartedAt', width: 10 },
          { header: '合同结束时间', key: 'ContractEndedAt', width: 32 },
          { header: '选手位置', key: 'PlayerPos', width: 10, outlineLevel: 1 },
          { header: '当前队伍ID', key: 'TeamID', width: 10 },
          { header: '比赛服账号', key: 'AcctMatch', width: 32 },
          { header: '键盘型号', key: 'KbType', width: 10, outlineLevel: 1 },
          { header: '键盘是否需要驱动', key: 'KbDriver', width: 10, outlineLevel: 1},
          { header: '鼠标型号', key: 'MouseType', width: 10, outlineLevel: 1},
          { header: '裤子尺寸', key: 'TrousersSize', width: 10, outlineLevel: 1},
          { header: '外套尺寸', key: 'CoatSize', width: 10, outlineLevel: 1},
          { header: 'T恤尺寸', key: 'TshirtSize', width: 10, outlineLevel: 1},
          { header: '体重（公斤）', key: 'Weight', width: 10, outlineLevel: 1},
          { header: '鼠标是否需要驱动', key: 'IsMouseDriven', width: 10, outlineLevel: 1},
          { header: '游戏ID', key: 'GameName', width: 10, outlineLevel: 1},
          { header: '鞋子尺码', key: 'ShoesSize', width: 10, outlineLevel: 1},
          { header: '手机号', key: 'Phone', width: 10, outlineLevel: 1},
          { header: '定装照', key: 'AppearancePhoto', width: 10, outlineLevel: 1},
        ];

        if (data && data.length) {
          for (let i in data){
            worksheet.addRow({
              id: data[i].id,
              IDNumber: data[i].IDNumber,
              Passport: data[i].Passport,
              NameCn: data[i].NameCn,
              NameEn: data[i].NameEn,
              Birthday: data[i].Birthday,
              Country: await service_ec_team_info.mappingCountry(data[i].Country),
              ContractStartedAt: data[i].ContractStartedAt,
              ContractEndedAt: data[i].ContractEndedAt,
              PlayerPos: data[i].PlayerPos,
              TeamID: teamInfoMap[data[i].TeamID] ? teamInfoMap[data[i].TeamID].TeamDes : '',
              AcctMatch: data[i].AcctMatch,
              KbType: data[i].KbType,
              KbDriver: data[i].KbDriver == 0 ? '否' : '是',
              MouseType: data[i].MouseType,
              TrousersSize: data[i].TrousersSize,
              CoatSize: data[i].CoatSize,
              TshirtSize: data[i].TshirtSize,
              Weight: data[i].Weight,
              IsMouseDriven: data[i].IsMouseDriven == 0 ? '否' : '是',
              GameName: data[i].GameName,
              ShoesSize: data[i].ShoesSize,
              Phone: data[i].Phone,
              AppearancePhoto: data[i].AppearancePhoto
            });
          }
        }
        const buffer = await workbook.xlsx.writeBuffer();
        reply(buffer).header('Content-Type', 'application/vnd.ms-excel;').header('Content-Disposition',`attachment;filename=player.xlsx`);
      } else if (activeName == 'coach') {
        const coachData = await service_tb_coach_info.query(request.server, params, page, pageSize);
        const data = coachData.rows;
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My coach');
        worksheet.columns = [
          { header: '序号', key: 'id', width: 10 },
          { header: '身份证号码', key: 'IDNumber', width: 32 },
          { header: '护照号码', key: 'Passport', width: 10, outlineLevel: 1 },
          { header: '姓名（中文）', key: 'NameCn', width: 10 },
          { header: '姓名（英文）', key: 'NameEn', width: 32 },
          { header: '生日', key: 'Birthday', width: 10, outlineLevel: 1 },
          { header: '国家地区', key: 'Country', width: 10, outlineLevel: 1 },
          { header: '合同开始时间', key: 'ContractStartedAt', width: 10 },
          { header: '合同结束时间', key: 'ContractEndedAt', width: 32 },
          { header: '当前队伍ID', key: 'iTeamId', width: 10 },
          { header: '比赛服账号', key: 'AcctMatch', width: 32 },
          { header: '裤子尺寸', key: 'TrousersSize', width: 10, outlineLevel: 1},
          { header: '外套尺寸', key: 'CoatSize', width: 10, outlineLevel: 1},
          { header: 'T恤尺寸', key: 'TshirtSize', width: 10, outlineLevel: 1},
          { header: '体重（公斤）', key: 'Weight', width: 10, outlineLevel: 1},
          { header: '游戏ID', key: 'GameName', width: 10, outlineLevel: 1},
          { header: '鞋子尺码', key: 'ShoesSize', width: 10, outlineLevel: 1},
          { header: '手机号', key: 'Phone', width: 10, outlineLevel: 1},
        ];
        if (data && data.length) {
          for (let i in data){
            worksheet.addRow({
              id: data[i].id,
              IDNumber: data[i].IDNumber,
              Passport: data[i].Passport,
              NameCn: data[i].NameCn,
              NameEn: data[i].NameEn,
              Birthday: data[i].Birthday,
              Country: await service_ec_team_info.mappingCountry(data[i].Country),
              ContractStartedAt: data[i].ContractStartedAt,
              ContractEndedAt: data[i].ContractEndedAt,
              iTeamId: teamInfoMap[data[i].iTeamId] ? teamInfoMap[data[i].iTeamId].TeamDes : '',
              AcctMatch: data[i].AcctMatch,
              TrousersSize: data[i].TrousersSize,
              CoatSize: data[i].CoatSize,
              TshirtSize: data[i].TshirtSize,
              Weight: data[i].Weight,
              GameName: data[i].GameName,
              ShoesSize: data[i].ShoesSize,
              Phone: data[i].Phone,
            });
          }
        }
        const buffer = await workbook.xlsx.writeBuffer();
        reply(buffer).header('Content-Type', 'application/vnd.ms-excel;').header('Content-Disposition',`attachment;filename=coach.xlsx`);
      }
    } catch (err) {
      console.log(err, '====xlsx err Excel');
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};




