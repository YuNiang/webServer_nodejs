'use strict';
const Joi = require('joi');
const Boom = require('boom');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);
const rpc_auth_base = require('../../rpc/authbase')

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      name: Joi.string().max(30).required(),
      email: Joi.string().max(100).required(),
      remark: Joi.string().max(200).allow(''),
      expiredAt: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {name, email, remark, expiredAt} = request.payload;

      reply(await rpc_auth_base.SaveApp(name, email, remark, expiredAt));
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
      name: Joi.string().max(30).required(),
      email: Joi.string().max(100).required(),
      remark: Joi.string().max(200).allow(''),
      expiredAt: Joi.string().required(),
      appID: Joi.string().allow(''),
      secret: Joi.string().allow('')
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    try {
      const {id, name, email, remark, expiredAt, appID, secret} = request.payload;

      reply(await rpc_auth_base.UpdateApp(id, name, email, remark, expiredAt, appID, secret));
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

      reply(await rpc_auth_base.DeleteApp(id));
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

      reply(await rpc_auth_base.QueryApp(page, size, ['id DESC']));
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

      reply(await rpc_auth_base.QueryAppByID(id));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply({
        success: false,
        errMsg: err
      });
    }
  }
};



