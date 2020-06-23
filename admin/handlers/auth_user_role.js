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
      addUserRoles: Joi.array().allow('').items(Joi.object({
        userID: Joi.number().integer().required(),
        roleID: Joi.number().integer().required()
      }))
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {deleteIds, addUserRoles} = request.payload;

      const task = [];
      deleteIds.forEach(id => {
        task.push(rpc_auth_base.DeleteUserRole(id))
      });
      addUserRoles.forEach(addUserRole => {
        task.push(rpc_auth_base.SaveUserRole(addUserRole.userID, addUserRole.roleID))
      });
      let userRoleResult = await Promise.all(task);

      let success = true, errMsg, newUserRoleArr = [];
      for (let item of userRoleResult) {
        newUserRoleArr = newUserRoleArr.concat(item.data);
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
          data: newUserRoleArr.filter(userRole => {
            return !deleteIds.includes(userRole.id)
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
      userID: Joi.number().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {userID} = request.query;

      const userRoleArrResult = await rpc_auth_base.QueryUserRoleByUserID(userID);
      if (!userRoleArrResult.success) {
        reply(userRoleArrResult);
      } else {

        const task = [];
        userRoleArrResult.data.forEach(userRole => {
          task.push(rpc_auth_base.QueryRoleRouteByRoleID(userRole.roleID))
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
              userRoleArr: userRoleArrResult.data,
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
