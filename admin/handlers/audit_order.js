'use strict';
const Joi = require('joi');
const Boom = require('boom');
const moment = require('moment');
const service_audit_order = require('../../service/audit_order');
const service_tb_player_info = require('../../service/tb_player_info');
const service_tb_team_info =  require('../../service/tb_team_info');
const service_tb_player_info_action = require('../../service/tb_player_info_action');
const service_tb_coach_info = require('../../service/tb_coach_info');
const service_oper_log = require('../../service/oper_log');
const rpc_appsmsbase = require('../../rpc/appsmsbase');
const rpc_auth_base = require('../../rpc/authbase');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const service_ec_team_info = require('../../service/ec_team_info');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * 查询有工单在进行中了
 */
module.exports.queryAuditingByOuterId = {
  auth: 'jwt',
  description: 'queryAuditingByOuterId',
  handler: async function (request, reply) {
    const { teamID, teamGroup } = request.auth.credentials;
    const { OuterID, iType } = request.query;
    try {
      const ret = await service_audit_order.queryAuditingByOuterId(OuterID, iType);
      if(ret && ret.length == 0
        && (iType.indexOf('120') != -1 || iType.indexOf('130') != -1  || iType.indexOf('140') != -1|| iType.indexOf('180') != -1)){
        const player = await service_tb_player_info.queryOne(request.server, OuterID);
        if(player){
          if(player.TeamID != teamID || player.TeamGroup != teamGroup) {
            reply(new ErrorModel('用户不在当前战队'));
          }
        }
      }
      reply(new SuccessModel(ret));
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * audit 通过和不通过
 */
module.exports.audit = {
  auth: 'jwt',
  description: 'save',
  validate: {
    payload: {
      id: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    let params = request.payload;
    const { UID, nickname, username } = request.auth.credentials;
    params.AuditedAt = new Date();
    params.UpdatedAt = new Date();
    params.UpdateOperID = `${UID}/${nickname || username}`;
    params.AuditOperID = `${UID}/${nickname || username}`;
    try {
      const order = await service_audit_order.queryOne(request.server, params.id);
      switch (order.iType) {
        case '100': await handlerPlayerAdd(request.server, order, params, '100'); break;
        case '110': await handlerPlayerRescission(request.server, order, params, '110'); break;
        case '120': await handlerUp(request.server, order, params, '120'); break;
        case '130': await handlerTrans(request.server, order, params, '130'); break;
        case '140': await handlerDown(request.server, order, params, '140'); break;
        case '150': await handlerCoachAdd(request.server, order, params, '150'); break;
        case '160': await handlerCoachRescission(request.server, order, params, '160'); break;
        case '170': await handlerPlayerUpdate(request.server, order, params, '170'); break;
        case '180': await handlerBrrow(request.server, order, params, '180'); break;
        case '190': await handlerBack(request.server, order, params, '190'); break;
        case '200': await handlerCoachUpdate(request.server, order, params, '200'); break;
      };
      await service_audit_order.audit(request.server, params);
      return reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * queryAuditHist 用户审核操作记录
 */
module.exports.queryAuditHist = {
  auth: 'jwt',
  description: 'queryAuditHist',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize),
      OuterID: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    let params = request.query;
    if (params.activeName === 'coach') {
      params.iType = '150,160,200';
    } else {
      params.iType = '100,110,120,130,140,170,180,190';
    }
    if (params.activeName === 'coach') {
      service_audit_order.queryAuditCoachHist(request.server, params).then(data => {
        reply(new SuccessModel(data));
      }).catch(err => {
        if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
        reply(new ErrorModel(err));
      });
    } else {
      service_audit_order.queryAuditPlayerHist(request.server, params).then(data => {
        reply(new SuccessModel(data));
      }).catch(err => {
        if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
        reply(new ErrorModel(err));
      });
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
  handler: function (request, reply) {
    const { id } = request.query;
    service_audit_order.queryOne(request.server, id).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 通过后再次备具
 */
module.exports.adoptAfterSave = {
  auth: 'jwt',
  description: 'save',
  validate: {
    payload: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    let params = request.payload;
    try {
      const data = await service_audit_order.adoptAfterSave(request.server, params);
      reply(new SuccessModel(data));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 审核暂存
 */
module.exports.updateOrder = {
  auth: 'jwt',
  description: 'update',
  handler: async function (request, reply) {
    let params = request.payload;
    const { nickname, username } = request.auth.credentials;
    try {
      let extList = [];
      Object.keys(params.newInfo).forEach(e => {
        if (e != 'fileData') {
          extList.push({
            extKey: e,
            extValue: params.newInfo[e],
            AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
            AuditReason: params.errorInfo ? params.errorInfo[e] : null
          });
        }
      });

      params.newInfo.fileData && params.newInfo.fileData.length && params.newInfo.fileData.forEach(d => {
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
        AuditOperID: nickname || username,
        AuditedAt: new Date()
      };
      if (extList.length) {
        orderData.ext = extList;
      }

      await service_audit_order.update(request.server, params.id, orderData);
      reply(new SuccessModel({ id: params.id}));
    } catch (err) {
      console.log(err, 'errr');
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

async function handlerPlayerAdd (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    const updatePlayer = {
      id: params.OuterID,
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason || '确认通过',
      AuditedAt: new Date(),
      AuditOperID: params.AuditOperID,
      // UpdatedAt: params.UpdatedAt,
      UpdateOperID: params.UpdateOperID,
      PlayingAt: moment().add(1, 'days'),
    };
    await service_tb_player_info.auditInfo(server, updatePlayer);
    // //转会选手，更新转会步骤
    // if (order.ret && order.ret['PlayerRole'] == '4' && order.ret['oldPlayerID']) {
    //   service_tb_player_info_action.updateStep(server, order.ret['oldPlayerID']);
    // }
    await sendEmail(server, params.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let baseMsg = {};
  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const translateKey = await service_tb_player_info.translateKey();
  if (params.errorInfo) {
    for (let key in params.errorInfo) {
      if(translateKey[key]){
        baseMsg[translateKey[key]] = params.errorInfo[key];
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus === 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus === -1 ? `${JSON.stringify(baseMsg)},${JSON.stringify(fileMsg)}` : ''
  };
  
  await service_oper_log.save(server, operLog);
};

async function handlerCoachAdd (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    const updateCoach = {
      id: params.OuterID,
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason || '同意通过',
      AuditedAt: new Date(),
      AuditOperID: params.AuditOperID,
    };
    await service_tb_coach_info.auditInfo(server, updateCoach);
    sendEmail(server, params.OuterID, params.AuditOperID, order.CreateOperID, iType)
  }
  let baseMsg = {};
  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const translateKey = await service_tb_player_info.translateKey();
  if (params.errorInfo) {
    for (let key in params.errorInfo) {
      if(translateKey[key]){
        baseMsg[translateKey[key]] = params.errorInfo[key];
      }
    }
  }

  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus === 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus === -1 ? `${JSON.stringify(baseMsg)},${JSON.stringify(fileMsg)}` : ''
  };
  await service_oper_log.save(server, operLog);
};

//上调更新战队信息
async function handlerUp (server, order, params, iType) {
  let updatePlayer = {
    id: order.OuterID,
    AuditStatus: params.AuditStatus,
    AuditReason: params.AuditReason,
    AuditedAt: new Date(),
    AuditOperID: params.AuditOperID,
    PlayingAt: moment().add(1, 'days'),
    fileData: []
  };
  if (params.AuditStatus === 1) {
    order.ext.forEach(e => {
      if (e.extKey.includes('f_')) {
        updatePlayer.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });
    updatePlayer.TeamGroup = '1';
    const lplTeamID = await service_tb_team_info.queryLPLTeamID(server,order.TeamID);
    if (!lplTeamID) {
      throw new Error("上调的战队不存在！")
    }
    updatePlayer.TeamID = lplTeamID;
    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType)
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus === 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus === -1 ? `${JSON.stringify(fileMsg)}` : ''
  };

  await service_oper_log.save(server, operLog);
};

async function handlerPlayerRescission (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    let updatePlayer = {
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason,
      AuditedAt: new Date(),
      AuditOperID: params.AuditOperID,
      TeamID: 0,
      TeamGroup: '0',
      id: order.OuterID,
      fileData: []
    };
    order.ext.forEach(e => {
      if (e.extKey.includes('f_')) {
        updatePlayer.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });
    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus === 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus === -1 ? `${JSON.stringify(fileMsg)}` : ''
  };
  service_oper_log.save(server, operLog);
};

async function  handlerTrans (server, order, params, iType) {
  let updatePlayer = {
    id: order.OuterID,
    AuditStatus: params.AuditStatus,
    AuditReason: params.AuditReason,
    AuditedAt: new Date(),
    AuditOperID: params.AuditOperID,
    PlayingAt: moment().add(1, 'days'),
    fileData: []
  };
  if (params.AuditStatus === 1) {
    let TeamID = null;
    let TeamGroup = '';
    order.ext.forEach(e => {
      if (e.extKey === 'TeamGroup') {
        TeamGroup = e;
      }
      if (e.extKey === 'TeamID') {
        TeamID = e;
      }
      if (e.extKey.includes('f_')) {
        updatePlayer.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });

    updatePlayer.ActionType = iType;
    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    let list = {
      PlayerID: order.OuterID,
      newTeamID: TeamID.extValue,
      oldTeamID: TeamID.extOldValue,
      newTeamGroup: TeamGroup.extValue,
      oldTeamGroup: TeamGroup.extOldValue,
      iType,
      Step: 1,
      CreatedAt: new Date()
    };
    await service_tb_player_info_action.save(server, list);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus === 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus === -1 ? `${JSON.stringify(fileMsg)}` : ''
  };
  await service_oper_log.save(server, operLog);
};

async function handlerDown (server, order, params, iType) {
   // 改用户状态 和 TeamGroup
  if (params.AuditStatus === 1) {
    let updatePlayer = {
      id: order.OuterID,
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason,
      AuditedAt: new Date(),
      AuditOperID: params.AuditOperID,
      fileData: [],
      PlayingAt: moment().add(1, 'days'),
    };
    order.ext.forEach(e => {
      if (e.extKey.includes('f_')) {
        updatePlayer.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });
    updatePlayer.TeamGroup = '2';
    const ldlTeamID = await service_tb_team_info.queryLDLTeamID(server,order.TeamID);
    if (!ldlTeamID) {
      throw new Error("下调的战队不存在！")
    }
    updatePlayer.TeamID = ldlTeamID;
    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus == -1 ? `${JSON.stringify(fileMsg)}` : ''
  };
  await service_oper_log.save(server, operLog);
};

// 教练解约
async function handlerCoachRescission (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    let updateCoach = {
      AuditStatus: order.AuditStatus,
      AuditReason: order.AuditReason,
      AuditedAt: new Date(),
      AuditOperID: order.AuditOperID,
      iSDelete: -1,
      id: order.OuterID,
      iType: iType,
      fileData: []
    };
    order.ext.forEach(e => {
      if (e.extKey.includes('f_')) {
        updateCoach.fileData.push({
          id: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });
    const r = await service_tb_coach_info.updateInfo(server, order.OuterID, updateCoach);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus == -1 ? `${JSON.stringify(fileMsg)}` : ''
  };
  service_oper_log.save(server, operLog);
};

async function handlerPlayerUpdate (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    let updateInfo = {
      fileData: []
    };
    order.ext.forEach(e => {
      if (!e.extKey.includes('f_')) {
        updateInfo[e.extKey] = e.extValue;
      }
    });
    for (let f in order.ext) {
      if (order.ext[f].extKey.includes('f_')) {
        updateInfo.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: order.ext[f].extKey.replace('f_', ''),
          ExtValue: order.ext[f].extValue,
          ExpireAt: order.ext[f].ext
        });
      }
    }
    updateInfo.id = order.OuterID;
    updateInfo.UpdatedAt = order.CreatedAt;
    updateInfo.UpdateOperID = order.CreateOperID;
    updateInfo.PlayingAt = moment().add(1, 'days');
    
    await service_tb_player_info.updateInfo(server, order.OuterID, updateInfo);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }
  let baseMsg = {};
  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const translateKey = await service_tb_player_info.translateKey();
  if (params.errorInfo) {
    for (let key in params.errorInfo) {
      if(translateKey[key]){
        baseMsg[translateKey[key]] = params.errorInfo[key]
      }
    }
  }
  
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus == -1 ? `${JSON.stringify(baseMsg)}${JSON.stringify(fileMsg)}` : ''
  }
  await service_oper_log.save(server, operLog);
};

async function handlerBrrow (server, order, params, iType) {
   // 改用户状态 和 TeamGroup
  //  需要验证通道值，不能点击
  if (params.AuditStatus === 1) {
    let updatePlayer = {
      id: order.OuterID,
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason,
      AuditedAt: new Date(),
      AuditOperID: params.AuditOperID,
      PlayingAt: moment().add(1, 'days'),
      fileData: []
    };
    order.ext.forEach(e => {
      if (e.extKey.includes('f_')) {
        updatePlayer.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: e.extKey.replace('f_', ''),
          ExtValue: e.extValue,
          ExpireAt: e.ext
        });
      }
    });
    updatePlayer.TeamGroup = '1';
    const lplTeamID = await service_tb_team_info.queryLPLTeamID(server,order.TeamID);
    if (!lplTeamID) {
      throw new Error("借调的战队不存在！")
    }
    updatePlayer.TeamID = lplTeamID;
    updatePlayer.ActionType = iType;
    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus == -1 ?  `${JSON.stringify(fileMsg)}` : ''
  };
  await service_oper_log.save(server, operLog);
};

//选手返还审核操作
async function handlerBack (server, order, params, iType) {
  let updatePlayer = {
    id: order.OuterID,
    AuditStatus: params.AuditStatus,
    AuditReason: params.AuditReason,
    AuditedAt: new Date(),
    AuditOperID: params.AuditOperID,
    PlayingAt: moment().add(1, 'days'),
    fileData: []
  };
  if (params.AuditStatus === 1) {
    //验证获取俱乐部信息
    const club = await service_ec_team_info.ClubInfo(order.TeamID);
    if(club.LDL == 0){
      throw new Error("俱乐部下的LDL战队不存在！");
    }
    updatePlayer.TeamID = club.LDL;
    updatePlayer.TeamGroup = '2';
    updatePlayer.ActionType = 0;

    await service_tb_player_info.updateInfo(server, order.OuterID, updatePlayer);
    await service_tb_player_info.delTeamAction(server, {
      PlayerID: order.OuterID,
      iType:[190,180]
    });
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  const operLog = {
    Type: iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝'
  };
  await service_oper_log.save(server, operLog);
};

async function handlerCoachUpdate (server, order, params, iType) {
  if (params.AuditStatus === 1) {
    let updateInfo = {
      id: order.OuterID,
      AuditStatus: params.AuditStatus,
      AuditReason: params.AuditReason || '确认通过',
      UpdatedAt: order.CreatedAt,
      UpdateOperID: order.CreateOperID,
      AuditedAt: new Date(),
      fileData: []
    };
    order.ext.forEach(e => {
      if (!e.extKey.includes('f_')) {
        updateInfo[e.extKey] = e.extValue;
      }
    });
    for (let f in order.ext) {
      if (order.ext[f].extKey.includes('f_')) {
        updateInfo.fileData.push({
          PlayerID: order.OuterID,
          TemplateID: order.ext[f].extKey.replace('f_', ''),
          ExtValue: order.ext[f].extValue,
          ExpireAt: order.ext[f].ext
        });
      }
    }
    await service_tb_coach_info.updateInfo(server, order.OuterID, updateInfo);
    sendEmail(server, order.OuterID, params.AuditOperID, order.CreateOperID, iType);
  }

  let baseMsg = {};
  let fileMsg = {};
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        fileMsg[params.newInfo.fileData[f].sName] = params.newInfo.fileData[f].errorInfo;
      }
    }
  }
  const translateKey = await service_tb_player_info.translateKey();
  if (params.errorInfo) {
    for (let key in params.errorInfo) {
      if(translateKey[key]){
        baseMsg[translateKey[key]] = params.errorInfo[key];
      }
    }
  }
  const operLog = {
    Type: order.iType,
    AuditOperID: params.AuditOperID,
    OuterID: order.OuterID,
    OrderID: order.id,
    AuditedAt: new Date(),
    Desc: params.AuditStatus == 1 ? '审核通过' : '审核拒绝',
    Reason: params.AuditStatus == -1 ?  `${JSON.stringify(baseMsg)}${JSON.stringify(fileMsg)}` : ''
  };
  await service_oper_log.save(server, operLog);
};

// 发送邮件
async function sendEmail (server, OuterID, AuditOperID, CreateOperID, type) {
  // 1、拿到选手信息
  let persInfo = {};
  if (type == '150' || type == '160' || type == '200') {
    persInfo = await service_tb_coach_info.queryOneWithFile(server, OuterID);
  } else {
    persInfo = await service_tb_player_info.queryOneWithFile(server, OuterID);
  }
  // 2. 拿到操作人的邮箱
  const OperID = CreateOperID.split('/');
  const AuditID = AuditOperID.split('/');
  const userInfo = await rpc_auth_base.QueryUserByID(OperID[0]);
  // 3. 拿到审核人的邮箱
  const auditInfo = await rpc_auth_base.QueryUserByID(AuditID[0]);

  let str = ``;
  if (type == '150') {
    str = '教练注册';
  } else if (type == '130') {
    str = '选手转会';
  } else if (type == '120') {
    str = '选手上调';
  } else if (type == '140') {
    str = '选手下放';
  } else if (type == '170') {
    str = '选手修改';
  } else if (type == '180') {
    str = '选手借调';
  } else if (type == '200') {
    str = '教练修改';
  } else if (type == '160') {
    str = '教练解约';
  } else if (type == '110') {
    str = '选手解约';
  } else if (type === '100') {
    str = '选手注册';
  } else if (type === '190') {
    str = '选手返还';
  };
  // 邮件模板
  const topic = (type == '110' || type == '160') ? `${str}【通知】` : `${str}【可上场通知】`;
  const validDate = moment(persInfo.PlayingAt).format('YYYY-MM-DD HH:mm:ss');
  // let file = {
  //   ExtValue: ''
  // };
  // if (registrantInfo && registrantInfo.file && registrantInfo.file.length) {
  //   registrantInfo.file.forEach(f => {
  //     if (f.sName.includes('选手定装照')) {
  //       file = f;
  //     }
  //   })
  // }
  // 查询战队信息
  let teamInfo = await service_tb_team_info.queryOne(server,persInfo.TeamID);
  let baseMsg = `
    <div>战队: ${teamInfo.TeamDes}</div>
    <div>${type == '150' || type == '160' || type == '200' ? '教练姓名:' : '选手姓名:'} ${type == '150' || type == '160' || type == '200' ?  persInfo.sName : persInfo.NameCn}</div>
    <div>ID: ${persInfo.GameName || ''}</div>
    <div>位置: ${persInfo.PlayerPos || ''}</div>
  `;
  let externalMsg = `
    ${baseMsg}
    ${type == '110' || type == '160' ?  '' : `<div>可上场时间: ${validDate || ''}</div>`}
    <div>定装照: ${persInfo.AppearancePhoto}</div>
  `;
  let insideMsg = `
    ${baseMsg}
    <div>合同到期时间: ${persInfo.ContractEndedAt}</div>
    <div>峡谷之巅账号: ${persInfo.AcctXiagu}</div>
    <div>比赛服账号: ${persInfo.AcctMatch}</div>
    <div>定装照: ${persInfo.AppearancePhoto}</div>`;

  if(type != '110' && type != '160'){
    insideMsg = insideMsg + `<div>可上场时间: ${validDate}</div>`;
  }

  try {
    // 确认的邮件应该只发送给“审核通过”的这个生态管理员。不应该发给“申请人”
    // if (userInfo && userInfo.data && userInfo.data.email) {
    //   await rpc_appsmsbase.SendCommonMessage(userInfo.data.email, 'email', topic, externalMsg);
    // }
    if (auditInfo && auditInfo.data  && auditInfo.data.email) {
      await rpc_appsmsbase.SendCommonMessage(auditInfo.data.email, 'email', topic , insideMsg);
    }
  } catch(err) {
    console.log(err);
  }
}
