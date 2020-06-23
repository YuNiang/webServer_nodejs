'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const service_tb_admin_info = require('../../service/tb_admin_info');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
      status: Joi.number().integer(),
      startedAt: Joi.string(),
      search: Joi.string()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {page, size, status, startedAt, search} = request.query;

    const criteria = {};

    if (status != null) criteria.iStatus = status;
    if (startedAt) criteria.createdAt = {
      $gte: new Date(startedAt),
      $lt: new Date(new Date(startedAt).getTime() + 86400000)
    };
    if (search) criteria.$or = [
      {sName: {$like: `%${search}%`}},
      {sPhone: {$like: `%${search}%`}},
    ];

    service_tb_admin_info.query(request.server, criteria, page, size, [['updatedAt', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * check pass
 */
module.exports.checkPass = {
  auth: 'jwt',
  validate: {
    params: {
      id: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {id} = request.params;

    service_tb_admin_info.checkPass(request.server, id).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * check not pass
 */
module.exports.checkNotPass = {
  auth: 'jwt',
  validate: {
    params: {
      id: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {id} = request.params;

    service_tb_admin_info.checkNotPass(request.server, id).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
