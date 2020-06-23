'use strict';
const Joi = require('joi');
const Boom = require('boom');
const rpc_auth_base = require('../../rpc/authbase');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      name: Joi.string().min(2).max(20).required(),
      code: Joi.string().min(1).max(20).required(),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {name, code, remark} = request.payload;

      reply(await rpc_auth_base.SaveRole(name, code, remark));
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
      name: Joi.string().min(2).max(20).required(),
      code: Joi.string().min(1).max(20).required(),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id, name, code, remark} = request.payload;

      reply(await rpc_auth_base.UpdateRole(id, name, code, remark));
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

      reply(await rpc_auth_base.DeleteRole(id));
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

      reply(await rpc_auth_base.QueryRole(page, size, ['id DESC']));
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

      reply(await rpc_auth_base.QueryRoleByID(id));
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
 * query all
 */
module.exports.queryAll = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {

      reply(await rpc_auth_base.QueryAllRole());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};
