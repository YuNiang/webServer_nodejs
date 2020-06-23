'use strict';
const Joi = require('joi');
const Boom = require('boom');
const rpc_auth_base = require('../../rpc/authbase');

/**
 * bulk save
 */
module.exports.bulkSaveUpdate = {
  auth: 'jwt',
  validate: {
    payload: {
      deleteIds: Joi.array().items(Joi.number().integer()).allow(''),
      addAppRoles: Joi.array().allow('').items(Joi.object({
        appID: Joi.number().integer().required(),
        roleID: Joi.number().integer().required()
      }))
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {deleteIds, addAppRoles} = request.payload;

      const task = [];
      deleteIds.forEach(id => {
        task.push(rpc_auth_base.DeleteAppRole(id))
      });
      addAppRoles.forEach(addAppRole => {
        task.push(rpc_auth_base.SaveAppRole(addAppRole.appID, addAppRole.roleID))
      });
      let appRoleResult = await Promise.all(task);

      let success = true, errMsg, newAppRoleArr = [];
      for (let item of appRoleResult) {
        newAppRoleArr = newAppRoleArr.concat(item.data);
        if (!item.success) {
          success = false;
          errMsg = item.errMsg;
          break;
        }
      }
      if (!success) {
        reply({success, errMsg})
      } else {
        reply({
          success: true,
          data: newAppRoleArr.filter(appRole => {
            return !deleteIds.includes(appRole.id)
          })
        })
      }

    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  validate: {
    query: {
      appID: Joi.number().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {appID} = request.query;

      const appRoleArrResult = await rpc_auth_base.QueryAppRoleByAppID(appID);
      if (!appRoleArrResult.success) {
        reply(appRoleArrResult);
      } else {

        const task = [];
        appRoleArrResult.data.forEach(appRole => {
          task.push(rpc_auth_base.QueryRoleRouteByRoleID(appRole.roleID))
        });
        let roleRouteArrResult = await Promise.all(task);

        let success = true, errMsg, roleRouteArr = [];
        for (let roleRouteResult of roleRouteArrResult) {
          roleRouteArr = roleRouteArr.concat(roleRouteResult.data);
          if (!roleRouteResult.success) {
            success = false;
            errMsg = item.errMsg;
            break;
          }
        }
        if (!success) {
          reply({success, errMsg})
        } else {
          reply({
            success: true,
            errMsg: '',
            data: {
              appRoleArr: appRoleArrResult.data,
              roleRouteArr: roleRouteArr
            }
          })
        }
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};
