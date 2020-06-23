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
      updateRoleRoutes:Joi.array().allow('').items(Joi.object({
        id: Joi.number().integer().required(),
        roleID: Joi.number().integer().required(),
        routeID: Joi.number().integer().required(),
        routeFilter: Joi.string().allow('')
      })),
      addRoleRoutes: Joi.array().allow('').items(Joi.object({
        roleID: Joi.number().integer().required(),
        routeID: Joi.number().integer().required(),
        routeFilter: Joi.string().allow('')
      })),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      let {deleteIds, updateRoleRoutes, addRoleRoutes} = request.payload;

      const task = [];
      deleteIds.forEach(id => {
        task.push(rpc_auth_base.DeleteRoleRoute(id))
      });
      addRoleRoutes.forEach(addRoleRoute => {
        task.push(rpc_auth_base.SaveRoleRoute(addRoleRoute.roleID, addRoleRoute.routeID, addRoleRoute.routeFilter))
      });
      updateRoleRoutes.forEach(updateRoleRoute => {
        task.push(rpc_auth_base.UpdateRoleRoute(updateRoleRoute.id, updateRoleRoute.roleID, updateRoleRoute.routeID, updateRoleRoute.routeFilter))
      });
      let result = await Promise.all(task);
      let success = true, errMsg, newRoleRouteArr = [];
      for (let item of result) {
        newRoleRouteArr = newRoleRouteArr.concat(item.data);
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
          data: newRoleRouteArr.filter(roleRoute => {
            return !deleteIds.includes(Number(roleRoute.id))
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
      roleID: Joi.number().required(),
      authPage: Joi.boolean().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {roleID, authPage} = request.query;

      let result = {
        success: true,
        data: {
          roleRouteArr: [],
          serviceRoute: {}
        }
      };

      let roleRouteResult = await rpc_auth_base.QueryRoleRouteByRoleID(roleID);
      if (!authPage) {
        reply(roleRouteResult);
      } else {

        if (!roleRouteResult.success) {
          reply(roleRouteResult);
        } else {
          let serviceSet = new Set();
          let roleRouteData = roleRouteResult.data;

          if (!roleRouteData.length) {
            reply(result);
          } else {

            // 组织roleRouteArr
            roleRouteData = roleRouteData.map(roleRoute => {
              serviceSet.add(roleRoute.route.service);
              delete roleRoute.route;
              return roleRoute;
            });
            result.data.roleRouteArr = roleRouteData;

            // 组织serviceRoute
            const serviceArr = [...serviceSet];
            const routeArrResult = await rpc_auth_base.QueryAllRoute(serviceArr);
            if (!routeArrResult.success) {
              reply(routeArrResult);
            } else {
              let routeArr = routeArrResult.data;
              serviceArr.forEach(service => {
                routeArr.forEach(route => {
                  if (route.service === service) {
                    result.data.serviceRoute[service] ? '' : result.data.serviceRoute[service] = [];
                    result.data.serviceRoute[service].push(route)
                  }
                });
              });
            }
            reply(result);
          }
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
