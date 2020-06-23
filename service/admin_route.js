const moment = require('moment-timezone');
const JWT = require('jsonwebtoken')
const config = require('../config/config');
const service_admin_interface = require('../service/admin_interface');

/**
 * save
 * @param server
 * @param name
 * @param route
 * @param remark
 * @param interfaces
 */
exports.save = (server, name, route, remark, interfaces) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_route = DB.getModel('admin_route');

  // query whether exists
  return Admin_route.findOne({
    where: {name}
  }).then(data => {
    if (data) throw new Error('already added');

    // validate interfaces
    return service_admin_interface.validate(server, interfaces);
  }).then(() => {

    //doc
    const doc = {
      name,
      route,
      remark,
      interfaces: JSON.stringify(interfaces)
    };

    //事务
    return Sequelize.transaction(t => {

      //钱包
      return Admin_route.findOrCreate({
        where: {name},
        defaults: doc,
        transaction: t
      }).then(([model, created]) => {
        if (!created) throw new Error('already added');

        return model;
      });
    });
  });
};

/**
 * update
 * @param server
 * @param id
 * @param name
 * @param route
 * @param remark
 * @param interfaces
 */
exports.update = (server, id, name, route, remark, interfaces) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_route = DB.getModel('admin_route');

  // query whether exists
  return Admin_route.findOne({
    where: {name}
  }).then(data => {
    if (data && data.id != id) throw new Error('already exists');

    // validate interfaces
    return service_admin_interface.validate(server, interfaces);
  }).then(() => {

    const criteria = {id};

    const doc = {
      name,
      route,
      remark,
      interfaces: JSON.stringify(interfaces)
    };
    return Admin_route.update(doc, {where: criteria});
  }).then(() => {

    return Admin_route.findOne({where: {id}});
  });
};

/**
 * delete
 * @param server
 * @param id
 */
exports.delete = (server, id) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_route = DB.getModel('admin_route');
  const Admin_roleRoute = DB.getModel('admin_roleRoute');

  // query whether exists
  return Admin_route.findOne({
    where: {id}
  }).then(data => {
    if (!data) throw new Error('route does not exist');

    // query the route whether in use
    return Admin_roleRoute.count({where: {routeId: id}});
  }).then(data => {
    if (data) throw new Error('cannot delete the route in use');

    return Admin_route.destroy({where: {id}});
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

  const Admin_route = DB.getModel('admin_route');

  return Admin_route.findAndCountAll({
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  }).then(data => {

    // format
    data.rows.forEach(item => {
      item.interfaces = JSON.parse(item.interfaces);
    });
    return data;
  });
};

/**
 * query all
 * @param server
 * @param criteria
 * @param order
 */
exports.queryAll = (server, criteria, order = []) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_route = DB.getModel('admin_route');

  return Admin_route.findAll({
    raw: true,
    where: criteria,
    order: order,
  }).then(data => {

    // format
    data.forEach(item => {
      item.interfaces = JSON.parse(item.interfaces);
    });
    return data;
  });
};
