const moment = require('moment-timezone');
const JWT = require('jsonwebtoken')
const config = require('../config/config');
const service_admin_auth = require('../service/admin_auth');

/**
 * save
 * @param server
 * @param roleId
 * @param routeId
 */
exports.save = (server, roleId, routeId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_role = DB.getModel('admin_role');
  const Admin_route = DB.getModel('admin_route');
  const Admin_roleRoute = DB.getModel('admin_roleRoute');

  // query whether exists
  return Admin_roleRoute.findOne({
    where: {roleId, routeId}
  }).then(data => {
    if (data) throw new Error('already added');

    // query role whether exists
    return Admin_role.count({where: {id: roleId}});
  }).then(data => {
    if (!data) throw new Error('role does not exist');

    // query route whether exists
    return Admin_route.count({where: {id: routeId}});
  }).then(data => {
    if (!data) throw new Error('route does not exist');

    // doc
    const doc = {
      roleId,
      routeId
    };

    // transaction
    return Sequelize.transaction(t => {

      //钱包
      return Admin_roleRoute.findOrCreate({
        where: {roleId, routeId},
        defaults: doc,
        transaction: t
      }).then(([model, created]) => {
        if (!created) throw new Error('already added');

        return model;
      });
    });
  }).then(data => {

    // refresh user permission
    service_admin_auth.refreshByRoleId(server, roleId);

    return data;
  });
};

/**
 * bulk save
 * @param server
 * @param roleId
 * @param routeIds
 */
exports.bulkSave = (server, roleId, routeIds) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_role = DB.getModel('admin_role');
  const Admin_route = DB.getModel('admin_route');
  const Admin_roleRoute = DB.getModel('admin_roleRoute');

  // query whether exists
  return Admin_roleRoute.count({
    where: {roleId, routeId: routeIds}
  }).then(data => {
    if (data) throw new Error('already added some of them');

    // query role whether exists
    return Admin_role.count({where: {id: roleId}});
  }).then(data => {
    if (!data) throw new Error('role does not exist');

    // query routes whether exists
    return Admin_route.count({where: {id: routeIds}});
  }).then(data => {
    if (data != routeIds.length) throw new Error('some routes does not exist');

    // docs
    const docs = [];

    routeIds.forEach(routeId => docs.push({roleId, routeId}));

    return Admin_roleRoute.bulkCreate(docs);
  }).then(data => {

    // refresh user permission
    service_admin_auth.refreshByRoleId(server, roleId);

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

  const Admin_roleRoute = DB.getModel('admin_roleRoute');

  let admin_roleRoute;

  // query whether exists
  return Admin_roleRoute.findOne({
    where: {id}
  }).then(data => {
    if (!data) throw new Error('role route does not exist');
    admin_roleRoute = data;

    return Admin_roleRoute.destroy({where: {id}});
  }).then(data => {

    // refresh user permission
    service_admin_auth.refreshByRoleId(server, admin_roleRoute.roleId);

    return data;
  });
};

/**
 * bulk delete
 * @param server
 * @param ids
 */
exports.bulkDelete = (server, ids) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_roleRoute = DB.getModel('admin_roleRoute');

  let array_admin_roleRoute;

  // query whether exists
  return Admin_roleRoute.findAll({
    where: {id: ids}
  }).then(data => {
    if (data.length != ids.length) throw new Error('some role route does not exist');
    array_admin_roleRoute = data;

    return Admin_roleRoute.destroy({where: {id: ids}});
  }).then(data => {

    // refresh user permission
    const task = [];

    array_admin_roleRoute.forEach(item => task.push(service_admin_auth.refreshByRoleId(server, item.roleId)));

    Promise.all(task);

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

  const Admin_roleRoute = DB.getModel('admin_roleRoute');
  const Admin_route = DB.getModel('admin_route');

  let data_roleRoute;
  let array_route;

  return Admin_roleRoute.findAndCountAll({
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  }).then(data => {

    data_roleRoute = data;

    // query route
    const array_roleId = [];
    data_roleRoute.rows.forEach(item => array_roleId.push(item.routeId));
    return Admin_route.findAll({where: {id: array_roleId}});
  }).then(data => {
    array_route = data;

    // attach route
    data_roleRoute.rows.forEach(roleRoute => {
      array_route.forEach(route => {
        if (roleRoute.routeId == route.id) roleRoute.route = route;
      });
    });
    return data_roleRoute;
  });
};

/**
 * query all
 * @param server
 * @param criteria
 * @param page
 * @param pageSize
 * @param order
 * @returns {Promise.<TResult>}
 */
exports.queryAll = (server, criteria, order = []) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_roleRoute = DB.getModel('admin_roleRoute');
  const Admin_route = DB.getModel('admin_route');

  let array_roleRoute;
  let array_route;

  return Admin_roleRoute.findAll({
    raw: true,
    where: criteria,
    order: order,
  }).then(data => {

    array_roleRoute = data;

    // query route
    const array_roleId = [];
    array_roleRoute.forEach(item => array_roleId.push(item.routeId));
    return Admin_route.findAll({where: {id: array_roleId}});
  }).then(data => {
    array_route = data;

    // attach route
    array_roleRoute.forEach(roleRoute => {
      array_route.forEach(route => {
        if (roleRoute.routeId == route.id) roleRoute.route = route;
      });
    });
    return array_roleRoute;
  });
};
