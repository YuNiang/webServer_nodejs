'use strict';
const Joi = require('joi');
const Boom = require('boom');
const service_tb_coach_info = require('../../service/tb_coach_info');
const service_audit_order = require('../../service/audit_order');
const service_oper_log = require('../../service/oper_log');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
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
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const { page, pageSize } = request.query;
    let criteria = {};
    if (request.query.NameCh != null) {
      criteria.NameCh = request.query.NameCh;
    }
    if (request.query.id != null) {
      criteria.id = request.query.id;
    }
    if (request.query.AuditedAt != null) {
      criteria.AuditedAt = {
        $gte: new Date(request.query.AuditedAt),
        $lt: new Date(new Date(request.query.AuditedAt).getTime() + 86400000)
      };
    }
    service_tb_coach_info.query(request.server, criteria, page, pageSize, [['id', 'DESC']]).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    });
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
    const { id } = request.query;
    try {
      const data = await service_tb_coach_info.queryOneWithFile(request.server, id);
      reply(new SuccessModel(data));
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
    let id = 0;
    let params = request.payload;
    if (params.id) {
      id = params.id;
    }
    params.UpdatedAt = new Date();
    params.CreateOperID = `${UID}/${nickname || username}`;
    params.UpdateOperID = `${UID}/${nickname || username}`;
    params.sNickName = params.sName;
    params.iTeamId = teamID;
    params.TeamGroup = teamGroup;
    try {
      if (params.id) {
        // id = await service_tb_coach_info.updateInfo(request.server, params.id, params);
        await service_tb_coach_info.updateInfo(request.server, params.id, params);
      } else {
        params.id = null;
        params.CreatedAt = new Date();
        const ret = await service_tb_coach_info.save(request.server, params);
        id = ret.id;
      }
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
      }
      // 插入数据到审核表 选手注册 iType 150
      let orderData = {
        OuterID: id,
        iType: '150',
        isActive: params.isActive,
        CreatedAt: params.CreatedAt,
        UpdatedAt: params.UpdatedAt,
        CreateOperID: `${UID}/${nickname || username}`,
        TeamID: teamID,
        TeamGroup: teamGroup
      };
      if(params.AuditStatus != null){
        orderData.AuditStatus = params.AuditStatus;
      }
      if (extList.length) {
        orderData.ext = extList;
      }
      let msg = '已提交';
      if (params.isActive == 1) {
        if (params.orderID) {
          const o = service_audit_order.queryOne(request.server, params.orderID);
          if(o && o.AuditStatus == -1) {
            msg = '已提交';
          }
        }
      }
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, orderData);
      } else {
        const orderID = await service_audit_order.save(request.server, orderData);
        params.orderID = orderID;
      }

      if (params.isActive == 1) {
        const objLog = {
          Type: '150',
          OperID: `${UID}/${nickname || username}`,
          OuterID: id,
          OrderID: params.orderID,
          CreatedAt: new Date(),
          Desc: msg
        };
        asyncOperLog(request.server, objLog);
      }
      reply(new SuccessModel({ id, orderID: params.orderID  }));
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
    const { UID, nickname, username, teamID, teamGroup } = request.auth.credentials;
    let params = request.payload;
    params.UpdatedAt = new Date();
    params.UpdateOperID = `${UID}/${nickname || username}`;
    params.UpdatedAt = new Date();
    params.iTeamId = teamID;
    params.TeamGroup = teamGroup;
    // 教练修改 iType  200
    try {
      // const checkOrder = await service_audit_order.queryAuditingByOuterId(params.id, '160,200');
      // if (checkOrder.length) {
      //   return reply(new ErrorModel({ message: '当前用户存在其他工单，请联系管理员' }));
      // }
      const checkUpdateOrder = await service_audit_order.queryAuditingByOuterId(params.id, '200');
      if (checkUpdateOrder.length) {
        params.orderID = checkUpdateOrder[0].id;
      }
      let extList = [];
      Object.keys(params).forEach(e => {
        if(e != 'fileData' && e != 'teamInfo' && e!='errorInfo' 
        && e != 'AuditStatus' && e != 'AuditReason' && e != 'IsDelete'){
          extList.push({
            extKey: e,
            extValue: params[e]
          });
        }
      });
    
      params.fileData && params.fileData.length && params.fileData.forEach(d => {
        extList.push({
          extKey: `f_${d.TemplateID}`,
          extValue: d.ExtValue,
          extOldValue: d.ExtValue,
          AuditError: (params.errorInfo && params.errorInfo[e] != null) ? -1 : 0,
          AuditError: (d.errorInfo) ? -1 : 0,
          ext: d.ExpireAt
        });
      });
      let orderData = {
        AuditStatus: 0,
        OuterID: params.id,
        iType: '200',
        CreatedAt: new Date(),
        CreateOperID: params.UpdateOperID,
        UpdatedAt: new Date(),
        isActive: params.isActive,
        TeamID: teamID,
        TeamGroup: teamGroup
      };
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
          Type: '200',
          OperID: `${UID}/${nickname || username}`,
          OuterID: params.id,
          CreatedAt: new Date(),
          OrderID: params.orderID,
          Desc: '已提交'
        };
        asyncOperLog(request.server, objLog);
      }
      return reply(new SuccessModel({ id: params.id, orderID: params.orderID }));
    } catch (err) {
      console.log(err, 'errr');
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
      if (params.iType == '150' && params.id) {
        await service_tb_coach_info.delInfo(request.server, params.id);
      }
      if (params.orderID) {
        await service_audit_order.update(request.server, params.orderID, {
          UpdatedAt: new Date(),
          isActive: -1
        });
      } 
      const objLog = {
        Type: params.iType,
        OperID: `${UID}/${nickname || username}`,
        OuterID: params.id,
        OrderID: params.orderID,
        CreatedAt: params.CreatedAt,
        Desc: '终止工单'
      };
      asyncOperLog(request.server, objLog);
      reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

async function asyncOperLog (server, params) {
  try {
    const ret = await service_oper_log.save(server, params);
    return ret;
  } catch (error) {
    if (!error.isBoom && error instanceof Error) {error = Boom.wrap(err, 400);}
    return error;
  }
};


