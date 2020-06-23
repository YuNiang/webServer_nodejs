const moment = require('moment-timezone');
const service_ec_team_info = require('./ec_team_info');
const service_file_template = require('./file_template');


exports.query = async (server, criteria, page, pageSize, order = [], attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  return Audit_Order.findAndCountAll({
    attributes,
    raw: true,
    where: criteria,
    order,
    offset: --page * pageSize,
    limit: pageSize
  });
};

exports.audit = async(server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  const { id } = params;
  const updateInfo = {
    AuditStatus: params.AuditStatus,
    AuditReason: params.AuditReason,
    AuditOperID: params.AuditOperID,
    AuditedAt: params.AuditedAt
  };
  const ret = await Audit_Order.update(updateInfo, { where: { id: id }});
  if (params.errorInfo) {
    for (let key in params.errorInfo) {
      if(key != 'fileData') {
        const criteria = {OrderID: id, extKey: key};
        const doc = {AuditError: -1, AuditReason: params.errorInfo[key]};
        const [model, created] = await Auditorder_ext.findOrCreate({defaults: doc, where: criteria, raw: true});
        if (!created) {
          await Auditorder_ext.update(doc, {where: criteria});
        }
      }
    }
  }
  if (params.newInfo && params.newInfo.fileData) {
    for (let f in params.newInfo.fileData) {
      if (params.newInfo.fileData[f].errorInfo) {
        const criteria = {OrderID: id, extKey: `f_${params.newInfo.fileData[f].TemplateID}`};
        const doc = {AuditError: -1, AuditReason: params.newInfo.fileData[f].errorInfo };
        const [model, created] = await Auditorder_ext.findOrCreate({defaults: doc, where: criteria, raw: true});
        if (!created) {
          await Auditorder_ext.update(doc, { where: criteria });
        }
        // await Auditorder_ext.update({ AuditError: -1, AuditReason: params.newInfo.fileData[f].errorInfo },
        // { where: { OrderID: id, extKey: `f_${params.newInfo.fileData[f].TemplateID}` }});
      }
    }
  }
  return ret;
};

exports.queryOne = async (server, id) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  let ret  = await Audit_Order.findOne({
    attributes: ['*'],
    raw: true,
    where: { id }
  });
  const retExt  = await Auditorder_ext.findAll({
    attributes: ['*'],
    raw: true,
    where: {OrderID: id}
  });
  ret.ext = retExt;
  return ret;
};

exports.queryAll = async (server, criteria, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');

  return Audit_Order.findAll({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  if(params.UpdatedAt == null){
    params.UpdatedAt = params.CreatedAt;
  }
  const order = await Audit_Order.create(params);
  if (params.ext && params.ext.length) {
    params.ext.forEach(e => {
      e.OrderID = order.id;
    });
   // eslint-disable-next-line indent
   await Auditorder_ext.bulkCreate(params.ext);
  }
  return order.id;
};

exports.update = async (server, id, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  Audit_Order.update(params, { where: {id}});
  if (params.ext) {
    params.ext.forEach(e => {
      e.OrderID = id;
    });
    await Auditorder_ext.destroy({where: { OrderID: id}});
    await Auditorder_ext.bulkCreate(params.ext);
  }
  return id;
};

exports.queryAuditingByOuterId = async (OuterID, iType) => {
  const sql = `  select  * from Auditorder where OuterID = ${OuterID} and iType in ( ${iType} )  and AuditStatus != 1 and isActive != -1 ;`;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret;
};

/**
 * 查询教练表
 */
// exports.queryWithCoachInfo = async (server, criteria, bcriteria, page, pageSize)  =>  {
//   let sql = 'select a.id '+
//   ', a.OuterID '+
//   ', a.AuditStatus '+
//   ', a.iType '+
//   ', a.CreatedAt '+
//   ', a.AuditReason '+
//   ', a.AuditedAt '+
//   ', b.IDNumber '+
//   ', b.Passport '+
//   ', b.sName as NameCn'+
//   ', b.NameEn '+
//   ', b.ContractStartedAt '+
//   ', b.ContractEndedAt '+
//   ', b.Country '+
//   ', b.iTeamId '+
//   ', b.UpdatedAt '+
//   ', b.VisaExpiredAt '+
//   ', b.AcctXiagu '+
//   ', b.TrousersSize '+
//   ', b.CoatSize '+
//   ', b.TshirtSize '+
//   ', b.Weight '+
//   ', b.CreateOperID '+
//   ', b.UpdateOperID '+
//   ', b.AuditOperID '+
//   ', createuser.adminname as CreateName'+
//   ', audit.adminname as AuditName'+
//   ', team.TeamDes as TeamName'+
//   ' from Auditorder as a  '+
//   ' left join tb_coach_info as b  '+
//   ' on a.OuterID=b.id  '+
//   ' left join admin_user as createuser  '+
//   ' on a.CreateOperID = createuser.username'+
//   ' left join admin_user as audit  '+
//   ' on a.AuditOperID = audit.username'+
//   ' left join tb_team_info as team  '+
//   ' on b.iTeamId = team.id' 
//   ;
//   sql += ' where a.iType in (150,160,200) ';
//   let p = [];
//   if (Object.keys(criteria).length > 0) {
//     Object.keys(criteria).forEach(d => {
//       if(Object.prototype.toString.call(criteria[d]) === '[Object Object]'){
//         criteria[d].forEach(son => {
//           p.push( 'a.' + d + son + criteria[d][son]);
//         });
//       } else {
//         p.push('a.' + d + ' = ' + criteria[d]);
//       }
//     });
//   }
//   if (Object.keys(bcriteria).length > 0) {
//     Object.keys(bcriteria).forEach(d => {
//       if(Object.prototype.toString.call(bcriteria[d]) === '[Object Object]'){
//         bcriteria[d].forEach(son => {
//           p.push( 'b.' + d + son + bcriteria[d][son]);
//         });
//       } else {
//         p.push('b.' + d + ' = ' + bcriteria[d]);
//       }
//     })
//   }
//   sql += (p.length > 0 ? ' and ': '') + p.join(' and ') ;
//   let countSql = ' select count(*) as num from ( ' + sql + ' ) as cc ';
//   let count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });

//   sql += ' limit ' + (--page*pageSize) + ',' + pageSize;
//   const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
//   return {
//     rows: ret,
//     count: count && count[0].num || 0
//   };
// };

/**
 * 查询选手表
 */
// exports.queryWithPlayerInfo = async (server, criteria, bcriteria, page, pageSize)  =>  {
//   let sql = 'select a.id '+
//   ', a.OuterID '+
//   ', a.AuditStatus '+
//   ', a.iType '+
//   ', a.CreatedAt '+
//   ', a.AuditReason '+
//   ', a.AuditedAt '+
//   ', b.IDNumber '+
//   ', b.Passport '+
//   ', b.NameCn '+
//   ', b.NameEn '+
//   ', b.ContractStartedAt '+
//   ', b.ContractEndedAt '+
//   ', b.Country '+
//   ', b.PlayerPos '+
//   ', b.TeamID '+
//   ', b.UpdatedAt '+
//   ', b.IsDelete '+
//   ', b.VisaExpiredAt '+
//   ', b.AcctXiagu '+
//   ', b.KbType '+
//   ', b.KbDriver '+
//   ', b.MouseType '+
//   ', b.TrousersSize '+
//   ', b.CoatSize '+
//   ', b.TshirtSize '+
//   ', b.Weight '+
//   ', b.PlayerRole '+
//   ', b.IsMouseDriven '+
//   ', b.GameID '+
//   ', b.CreateOperID '+
//   ', b.UpdateOperID '+
//   ', b.AuditOperID '+
//   ', createuser.adminname as CreateName'+
//   ', audit.adminname as AuditName'+
//   ', team.TeamDes as TeamName'+
//   ' from Auditorder as a  '+
//   ' left join tb_player_info as b  '+
//   ' on a.OuterID=b.id  '+
//   ' left join admin_user as createuser  '+
//   ' on a.CreateOperID = createuser.username'+
//   ' left join admin_user as audit  '+
//   ' on a.AuditOperID = audit.username'+
//   ' left join tb_team_info as team  '+
//   ' on b.TeamID = team.id '
//   ;
//   sql += ' where a.iType in (100,110,120,130,140,170,180,190) ';
//   let p = [];
//   if (Object.keys(criteria).length > 0) {
//     Object.keys(criteria).forEach(d => {
//       if(Object.prototype.toString.call(criteria[d]) === '[Object Object]'){
//         criteria[d].forEach(son => {
//           p.push( 'a.' + d + son + criteria[d][son]);
//         });
//       } else {
//         p.push('a.' + d + ' = ' + criteria[d]);
//       }
//     })
//   }
//   if (Object.keys(bcriteria).length > 0) {
//     Object.keys(bcriteria).forEach(d => {
//       if(Object.prototype.toString.call(bcriteria[d]) === '[Object Object]'){
//         bcriteria[d].forEach(son => {
//           p.push( 'b.' + d + son + bcriteria[d][son]);
//         });
//       } else {
//         p.push('b.' + d + ' = ' + bcriteria[d]);
//       }
//     })
//   }
//   sql += (p.length > 0 ? ' and ': '') + p.join(' and ') ;
//   let countSql = ' select count(*) as num from ( ' + sql + ' ) as cc ';
//   let count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });

//   sql += ' limit ' + (--page*pageSize) + ',' + pageSize;
//   const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
//   return {
//     rows: ret,
//     count: count && count.length && count[0].num || 0
//   };
// };

// exports.queryWithCoachFile = async (server, OuterIDs)  =>  {
//   const sql = `select a.*, b.sName
//     from tb_player_info_file as a 
//     inner join FileTemplate as b 
//     on a.TemplateID=b.id`;
//   const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
//   return ret;
// };

// exports.queryWithPlayerFile = async (server, OuterIDs)  =>  {
//   const sql = `select a.*, b.sName
//     from tb_player_info_file as a 
//     inner join FileTemplate as b 
//     on a.TemplateID=b.id`;
//   const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
//   return ret;
// };

exports.queryAuditPlayerHist = async (server, criteria)  =>  {
  let sql = 'select a.* '+
  ' from Auditorder as a  '+
  ' where a.OuterID = ' + criteria.OuterID + ' ' +
  ' and a.iType in ( ' + criteria.iType + ' ) ' ;
  sql += ' limit ' + (--criteria.page*criteria.pageSize) + ',' + criteria.pageSize;
  return global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
};

exports.queryAuditCoachHist = async (server, criteria)  =>  {
  let sql = 'select a.* '+
  ' from Auditorder as a  '+
  ' where a.OuterID = ' + criteria.OuterID + ' ' +
  ' and a.iType in ( ' + criteria.iType + ' ) ' ;
  sql += ' limit ' + (--criteria.page*criteria.pageSize) + ',' + criteria.pageSize;
  return global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
};

/**
 * queryExtByOrderId 根据 工单ID查询扩展表
 * @returns {*}
 */
exports.queryExtByOrderId = async (server, PlayerID, Type, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  const criteria = {
    PlayerID,
    Type
  };
  return Auditorder_ext.findAll({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.saveExt = async (server, list) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Auditorder_ext = DB.getModel('Auditorder_ext');
  return Auditorder_ext.bulkCreate(list);
};

exports.delAuditingOrder = async (server, OuterID, iType) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');

  const sql = `  select  * from Auditorder where OuterID = ${OuterID} and iType in ( ${iType} )  and AuditStatus = 0 ;`;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  if (ret && ret.length) {
    for (let o in ret) {
      await Audit_Order.destroy({where: {
        id: ret[o].id
      }});
      await Auditorder_ext.destroy({where: {
        OrderID: ret[o].id
      }});
    }
  }
  return true;
};

exports.delOrderByID = async (server, id) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const Auditorder_ext = DB.getModel('Auditorder_ext');

  await Audit_Order.destroy({where: {
    id
  }});
  await Auditorder_ext.destroy({where: {
    OrderID: id
  }});
  return true;
};

exports.adoptAfterSave = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  const curTime = moment().format("YYYY-MM-DD HH:mm:ss");
  // eslint-disable-next-line no-undef
  params.AuditReason = Sequelize.fn('concat', Sequelize.col('AuditReason'), `${curTime}`, params.AuditPassReason);
  const ret = await Audit_Order.update(params, { where: { id: params.id }});
  return ret;
};

exports.queryOrderWithAllData = async (server, criteria, activeName, page, pageSize) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Audit_Order = DB.getModel('Auditorder');
  if (activeName === 'coach') {
    if (!criteria.iType) {
      criteria.iType = { $in: [150,160,200] }
    }
  } else if (activeName === 'player') {
    if (!criteria.iType) {
      criteria.iType = { $in: [100,110,120,130,140,170,180,190] }
    }
  }
  if (criteria.AuditStatus !== null && criteria.AuditStatus !== undefined) {
    criteria.AuditStatus = { $in: criteria.AuditStatus.split(',') }
  }

  if (criteria.isActive) {
    criteria.isActive = { $in: criteria.isActive.split(',') }
  }
  const order = await Audit_Order.findAndCountAll({
    attributes: ['*'], raw: true, where: criteria,
    offset: --page * pageSize, limit: pageSize,
    order: [['UpdatedAt', 'DESC']],
  });
  if (activeName === 'coach') {
    await fillCoachInfo(server, order);
  } else {
    await fillPlayerInfo(server, order);
  }
  await fillExt(server, order);
  await fillTeamInfo(server, order);
  order.rows 
  && order.rows.length 
  && order.rows.forEach(r => {
    if(!r.oldInfo){
      r.oldInfo = r.newInfo;
    }
  });
  return order;
};
async function fillExt (server, order) {
  let tmpId = [];
  if (order.rows && order.rows.length) {
    order.rows.forEach(t => {
      tmpId.push(t.id);
    });
  }
  if (tmpId.length) {
    let sql = `select * from Auditorder_ext where OrderID in ( ${tmpId.join(',')} )`;
    const retExt = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
    if(retExt && retExt.length) {
      order.rows.forEach(r => {
        r.newInfo = {
          fileData: []
        };
        retExt.forEach(e => {
          if (r.id === e.OrderID) {
            if (e.extKey.includes('f_')) {
              const templateFile = service_file_template.queryOne(server, e.extKey.replace('f_', ''));
              let tmpFile = {
                TemplateID: e.extKey.replace('f_', ''),
                ExtValue: e.extValue,
                ExpireAt: e.ext,
                sName: templateFile.sName
              };
              tmpFile.errorInfo = e.AuditReason;
              r.newInfo.fileData.push(tmpFile);
            } else {
              r.newInfo[e.extKey] = e.extValue;
              if (e.AuditError == -1) {
                if (!r.errorInfo) {
                  r.errorInfo = {};
                }
                r.errorInfo[e.extKey] = e.AuditReason;
              }
            }
          }
        });
      });
    }
  }
}
async function fillTeamInfo (server, order) {
  let teamId = [];
  if (order.rows && order.rows.length) {
    order.rows.forEach(t => {
      if (t.TeamID) {
        teamId.push(t.TeamID);
      }
      if (t.iTeamId) {
        teamId.push(t.iTeamId);
      }
    });
  }
  if (teamId.length) {
    let ret = await service_ec_team_info.query();
    if (ret && ret.length) {
      order.rows.forEach(r => {
        ret.forEach(t => {
          if (r.TeamID == t.id) {
            r.teamInfo = t;
          }
        });
      });
    }
  }
}
async function fillPlayerInfo (server, order) {
  let tmpId = [];
  if (order.rows && order.rows.length) {
    order.rows.forEach(t => {
      if(['100','110','120','130','140','170','180','190'].includes(t.iType) && t.OuterID) {
        tmpId.push(t.OuterID);
      }
    });
  }
  if (tmpId.length) {
    let sql = `select * from tb_player_info where id in ( ${tmpId.join(',')} )`;
    let sqlFile = `select p.*,f.sName from tb_player_info_file as p
    left join FileTemplate as f on p.TemplateID = f.id
    where p.PlayerID in ( ${tmpId.join(',')} )`;
    let playerRet = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
    let playerFileRet = await global.Sequelize.query(sqlFile, { type: global.Sequelize.QueryTypes.SELECT });
    if(playerRet && playerRet.length && playerFileRet && playerFileRet.length){
      playerRet.forEach(p => {
        p.fileData = [];
        playerFileRet.forEach(f => {
          if(p.id == f.PlayerID){
            p.fileData.push(f);
          }
        });
      });
    }
    if(playerRet && playerRet.length){
      order.rows.forEach(r => {
        playerRet.forEach(p => {
          if(r.OuterID === p.id){
            r.oldInfo = p;
          }
        });
      });
    }
  }
}

async function fillCoachInfo (server, order) {
  let tmpId = [];
  if (order.rows && order.rows.length) {
    order.rows.forEach(t => {
      if(['150','160','200'].includes(t.iType) && t.OuterID){
        tmpId.push(t.OuterID);
      }
    });
  }
  if (tmpId.length) {
    let sql = `select * from tb_coach_info where id in ( ${tmpId.join(',')} )`;
    let sqlFile = `select p.*,f.sName from tb_coach_info_file as p
    left join FileTemplate as f on p.TemplateID = f.id
    where p.CoachID in ( ${tmpId.join(',')} )`;
    let coachRet = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
    let coachFileRet = await global.Sequelize.query(sqlFile, { type: global.Sequelize.QueryTypes.SELECT });
    if(coachRet && coachRet.length && coachFileRet && coachFileRet.length){
      coachRet.forEach(p => {
        p.fileData = [];
        coachFileRet.forEach(f => {
          if(p.id = f.CoachID){
            p.fileData.push(f);
          }
        });
      });
    }
    if (coachRet && coachRet.length) {
      order.rows.forEach(r => {
        coachRet.forEach(p => {
          if(r.OuterID === p.id){
            r.oldInfo = p;
          }
        });
      });
    }
  }
}
