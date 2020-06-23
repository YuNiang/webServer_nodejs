const moment = require('moment-timezone');
const JWT = require('jsonwebtoken')
const config = require('../config/config');

/**
 * save
 * @param server
 * @param name
 * @param remark
 */
exports.save = (server, name, remark) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_role = DB.getModel('admin_role');

  // query whether exists
  return Admin_role.findOne({
    where: {name}
  }).then(data => {
    if (data) throw new Error('already added');

    // doc
    const doc = {
      name,
      remark
    };

    // transaction
    return Sequelize.transaction(t => {

      // doc
      return Admin_role.findOrCreate({
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
 * @param remark
 */
exports.update = (server, id, name, remark) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_role = DB.getModel('admin_role');

  // query whether exists
  return Admin_role.findOne({
    where: {name}
  }).then(data => {
    if (data && data.id != id) throw new Error('already exists');

    const criteria = {id};

    const doc = {
      name,
      remark
    };
    return Admin_role.update(doc, {where: criteria});
  }).then(() => {

    return Admin_role.findOne({where: {id}});
  });
};

/**
 * delete
 * @param server
 * @param id
 */
exports.delete = (server, id) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_role = DB.getModel('admin_role');
  const Admin_userRole = DB.getModel('admin_userRole');

  // query whether exists
  return Admin_role.findOne({
    where: {id}
  }).then(data => {
    if (!data) throw new Error('role does not exist');

    // query the role whether in use
    return Admin_userRole.count({where: {roleId: id}});
  }).then(data => {
    if (data) throw new Error('cannot delete the role in use');

    return Admin_role.destroy({where: {id}});
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

  const Admin_role = DB.getModel('admin_role');

  return Admin_role.findAndCountAll({
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  });
};
