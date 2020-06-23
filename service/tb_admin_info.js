const moment = require('moment');
const config = require('../config/config');

/**
 * query
 * @param server
 * @param criteria
 * @param page
 * @param pageSize
 * @param order
 * @param attributes
 * @returns {*}
 */
exports.query = (server, criteria, page = 1, pageSize = 10, order = [], attributes = ['*']) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_admin_info = DB.getModel('tb_admin_info');

  return TB_admin_info.findAndCountAll({
    attributes: attributes,
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  });
};

/**
 * query one
 * @param server
 * @param criteria
 * @param attributes
 * @returns {*}
 */
exports.queryOne = (server, criteria, attributes = ['*']) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_admin_info = DB.getModel('tb_admin_info');

  return TB_admin_info.findOne({
    attributes: attributes,
    raw: true,
    where: criteria
  });
};

/**
 * save
 * @param server
 * @param sOpenId
 * @param sName
 * @param sPhone
 * @param iTeamId
 * @returns {*}
 */
exports.save = (server, sOpenId, sName, sPhone, iTeamId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_admin_info = DB.getModel('tb_admin_info');

  // query whether registered
  return TB_admin_info.findOne({where: {sOpenId}}).then(data => {
    if (!data) throw new Error('account does not exist');
    if (data.sName != null && data.iStatus == 0) throw new Error('already applied');
    if (data.sName != null && data.iStatus == 1) throw new Error('already passed');

    const criteria = {sOpenId};
    const doc = {sName, sPhone, iTeamId, iStatus: 0};

    return TB_admin_info.update(doc, {where: criteria}).then(() => {

      return doc;
    });
  });
};

/**
 * check pass
 * @param server
 * @param id
 * @returns {*}
 */
exports.checkPass = (server, id) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_admin_info = DB.getModel('tb_admin_info');

  // query
  return TB_admin_info.findOne({where: {id}}).then(data => {
    if (!data) throw new Error('permission denied');
    if (data.iStatus != 0) throw new Error('permission denied');

    const criteria = {id, iStatus: 0};
    const doc = {iStatus: 1, iRoleId: data.iTeamId ? 3 : 1};

    return TB_admin_info.update(doc, {where: criteria}).then(data => {
      if (data[0] != 1) throw new Error('permission denied');

      return doc;
    });
  });
};

/**
 * check not pass
 * @param server
 * @param id
 * @returns {*}
 */
exports.checkNotPass = (server, id) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_admin_info = DB.getModel('tb_admin_info');

  // query
  return TB_admin_info.findOne({where: {id}}).then(data => {
    if (!data) throw new Error('permission denied');
    if (data.iStatus != 0) throw new Error('permission denied');

    const criteria = {id, iStatus: 0};
    const doc = {iStatus: 2};

    return TB_admin_info.update(doc, {where: criteria}).then(data => {
      if (data[0] != 1) throw new Error('permission denied');

      return doc;
    });
  });
};
