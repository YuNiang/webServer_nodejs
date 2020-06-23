'use strict';
const Joi = require('joi');
const Boom = require('boom');
const rpc_auth_base = require('../../rpc/authbase');
/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      service: Joi.string().min(1).max(50).required(),
      method: Joi.string().max(50).allow(''),
      path: Joi.string().max(50).allow(''),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {service, method, path, remark} = request.payload;

      reply(await rpc_auth_base.SaveRoute(service, method, path, remark));
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
      service: Joi.string().min(1).max(50).required(),
      method: Joi.string().max(50).allow(''),
      path: Joi.string().max(50).allow(''),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id, service, method, path, remark} = request.payload;

      reply(await rpc_auth_base.UpdateRoute(id, service, method, path, remark));
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
      reply(await rpc_auth_base.DeleteRoute(id));
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

      reply(await rpc_auth_base.QueryRouteByID(id));
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
 * 查询过滤项选项
 */
module.exports.distinct = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {

      reply(await rpc_auth_base.QueryAllRouteService());
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
 * 根据service查询
 */
module.exports.queryByService = {
  auth: 'jwt',
  validate: {
    query: {
      service: Joi.string().min(1).max(50).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {service} = request.query;

      reply(await rpc_auth_base.QueryAllRoute([service]));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};

