const moment = require('moment-timezone');
const config = require('../config/config');
const client = require('../lib/redis').getClient();
const service_admin_user = require('../service/admin_user');

const hashKey = 'permission';

/**
 * init
 * @param server
 * @param username
 * @returns {Promise.<TResult>}
 */
exports.init = (server, username) => {

  let array_route = [];

  // query user route
  return service_admin_user.queryRoute(server, username).then(data => {
    data.forEach(item => {
      array_route = [...array_route, ...JSON.parse(item.interfaces)];
    });

    const array_permission = [];

    array_route.forEach(({method, path}) => {

      let str_reg = '^';

      path.split('/').forEach(item => {
        if (!item) return;
        str_reg += /\{.*}/.test(item) ? `/[^/]+` : `/${item}`;
      })
      str_reg += '$';
      array_permission.push({method, regExp: str_reg});
    });

    return client.hsetAsync([hashKey, username, JSON.stringify(array_permission)]);
  });
};

/**
 * refresh by userId
 * @param server
 * @param userId
 * @returns {Promise.<TResult>}
 */
exports.refreshByUserId = (server, userId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_user = DB.getModel('admin_user');

  return Admin_user.findOne({where: {id: userId}}).then(({username}) => {

    return this.init(server, username);
  });

};

/**
 * refresh by roleId
 * @param server
 * @param roleId
 * @returns {Promise.<TResult>}
 */
exports.refreshByRoleId = (server, roleId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_userRole = DB.getModel('admin_userRole');

  return Admin_userRole.findAll({where: {roleId}}).then(data => {

    const task = [];

    data.forEach(item => task.push(this.refreshByUserId(server, item.userId)));

    return Promise.all(task);
  });
};

/**
 * validate
 * @param username
 * @param request
 */
exports.validate = (username, request) => {
  return client.hgetAsync([hashKey, username]).then(data => {
    if (!data) throw new Error('permission init error');
    let flag = false;
    JSON.parse(data).forEach(({method, regExp}) => {
      if (!flag) if (method.toLowerCase() == request.method.toLowerCase() && new RegExp(regExp).test(request.path)) flag = true;
    });
    return flag;
  });
};
