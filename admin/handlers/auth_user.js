'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);
const rpc_auth_base = require('../../rpc/authbase');
const rpc_eco_user = require('../../service/eco_user');



/**
 * 登录
 */
module.exports.login = {
  validate: {
    payload: {
      code: Joi.string().min(2).max(100).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const {code} = request.payload;
    if (process.env.NODE_ENV == 'development' && code === 'development') {
      const routeResult = await rpc_auth_base.QueryAllRoute(['DM']);
      if (!routeResult.success){
        reply(routeResult);
      } else {
        const session = {
          type: 'admin'
        };
        const token = JWT.sign(session, process.env.JWT_SECRET);
        const replyResult = {
          success: true,
          data: {
            authorization: token,
            authRoutes: routeResult.data,
            user: {nickname: 'admin'}
          }
        };
        reply(replyResult);
      }
    } else {
      try {
        let loginResult = await rpc_auth_base.LoginByWeChat(code);
        if (loginResult.success && loginResult.data) {
          if (loginResult.data.UID) {
            // query user info
            const userResult = await rpc_auth_base.QueryUserByID(loginResult.data.UID);
            if (userResult.success) {
              loginResult.data.user = userResult.data;
            } else {
              loginResult.success = false;
              loginResult.errMsg = userResult.errMsg;
              return reply(loginResult);
            }
            // query team info
            const userTeam = await rpc_eco_user.queryUserTeam(request.server, loginResult.data.UID);
            if (userTeam) {
              const params = {
                authorization: loginResult.data.authorization,
                payload: {
                  teamID: userTeam.TeamID,
                  teamGroup: userTeam.TeamGroup,
                  nickname: userResult.data.nickname,
                  username: userResult.data.username
                }
              };
              const updateJWTPayloadResult = await rpc_auth_base.UpdateJWTPayload(params);
              if (updateJWTPayloadResult.success) {
                loginResult.data.authorization = updateJWTPayloadResult.data.authorization;
                loginResult.data.teamInfo = userTeam;
              } else {
                loginResult.success = false;
                loginResult.errMsg = userResult.errMsg;
                return reply(loginResult);
              }
            }
          } else {
            loginResult.success = false;
            loginResult.errMsg = 'cannot get uid';
          }
        }
        reply(loginResult);
      } catch (err) {
        if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
        reply({
          success: false,
          errMsg: err
        });
      }
    }
  }
};

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      weChatUnionID: Joi.string().max(64).allow(''),
      phone: Joi.string().max(20).allow(''),
      IDName: Joi.string().max(50).required(),
      nickname: Joi.string().max(30).allow('')
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {weChatUnionID, phone, IDName, nickname} = request.payload;

      if ((!phone || !phone.trim()) && (!weChatUnionID || !weChatUnionID.trim())) {
        reply({
          success: false,
          errMsg: 'phone and weChatUnionID cannot be null at the same'
        })
      } else {

        reply(await rpc_auth_base.SaveUser(phone, null, weChatUnionID, null, nickname, null, IDName));
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
 * update
 */
module.exports.update = {
  auth: 'jwt',
  validate: {
    payload: {
      id: Joi.number().integer().required(),
      weChatUnionID: Joi.string().max(64).allow(''),
      phone: Joi.string().max(20).allow(''),
      IDName: Joi.string().max(50).required(),
      nickname: Joi.string().max(30).allow(''),
      IDNumber: Joi.string().max(20).allow(''),
      email: Joi.string().max(100).allow('')
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id, weChatUnionID, IDName, nickname, IDNumber, phone, email} = request.payload;

      if ((!phone || !phone.trim()) && (!weChatUnionID || !weChatUnionID.trim())) {
        reply({
          success: false,
          errMsg: 'phone and weChatUnionID cannot be null at the same'
        })
      } else {

        reply(await rpc_auth_base.UpdateUser(id, phone, null, weChatUnionID, email, nickname, IDNumber, IDName));
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
 * delete
 */
module.exports.delete = {
  auth: 'jwt',
  validate: {
    payload: {
      id: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id} = request.payload;

      reply(await rpc_auth_base.DeleteUser(id));
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
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {page, size} = request.query;

      reply(await rpc_auth_base.QueryUser(page, size, ['id DESC']));
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
 * 根据ID查询
 */
module.exports.queryById = {
  auth: 'jwt',
  validate: {
    query: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id} = request.query;

      reply(await rpc_auth_base.QueryUserByID(id));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};






