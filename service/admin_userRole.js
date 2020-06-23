const moment = require('moment-timezone');
const JWT = require('jsonwebtoken')
const config = require('../config/config');
const service_admin_auth = require('../service/admin_auth');

/**
 * save
 * @param server
 * @param userId
 * @param roleId
 */
exports.save = (server, userId, roleId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_user = DB.getModel('admin_user');
  const Admin_role = DB.getModel('admin_role');
  const Admin_userRole = DB.getModel('admin_userRole');

  // query whether exists
  return Admin_userRole.findOne({
    where: {userId, roleId}
  }).then(data => {
    if (data) throw new Error('already added');

    // query user whether exists
    return Admin_user.count({where: {id: userId}});
  }).then(data => {
    if (!data) throw new Error('user does not exist');

    // query role whether exists
    return Admin_role.count({where: {id: roleId}});
  }).then(data => {
    if (!data) throw new Error('role does not exist');

    // doc
    const doc = {
      userId,
      roleId
    };

    //transaction
    return Sequelize.transaction(t => {

      //钱包
      return Admin_userRole.findOrCreate({
        where: {userId, roleId},
        defaults: doc,
        transaction: t
      }).then(([model, created]) => {
        if (!created) throw new Error('already added');

        return model;
      });
    });
  }).then(data => {

    // refresh user permission
    service_admin_auth.refreshByUserId(server, userId);

    return data;
  });
};

/**
 * delete
 * @param server
 * @param id
 */
exports.delete = (server, id) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_userRole = DB.getModel('admin_userRole');

  let admin_userRole;

  // query whether exists
  return Admin_userRole.findOne({
    where: {id}
  }).then(data => {
    if (!data) throw new Error('user role does not exist');
    admin_userRole = data;

    return Admin_userRole.destroy({where: {id}});
  }).then(data => {

    // refresh user permission
    service_admin_auth.refreshByUserId(server, admin_userRole.userId);

    return data;
  });
};

/**
 * query
 * @param server
 * @param criteria
 * @param page
 * @param pageSize
 * @param order
 * @returns {Promise.<TResult>}
 */
exports.query = (server, criteria, page = 1, pageSize = 10, order = []) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_userRole = DB.getModel('admin_userRole');
  const Admin_role = DB.getModel('admin_role');

  let data_userRole;
  let array_role;

  return Admin_userRole.findAndCountAll({
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  }).then(data => {

    data_userRole = data;

    // query role
    const array_roleId = [];
    data_userRole.rows.forEach(item => array_roleId.push(item.roleId));
    return Admin_role.findAll({where: {id: array_roleId}});
  }).then(data => {
    array_role = data;

    // attach role
    data_userRole.rows.forEach(userRole => {
      array_role.forEach(role => {
        if (userRole.roleId == role.id) userRole.role = role;
      });
    });
    return data_userRole;
  });
};

exports.queryRoleList = async (server, userId) => {
  const sql = `select * from admin_userRole where userId in ( ${userId} ) and deletedAt is null `
  const data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return data;
};
