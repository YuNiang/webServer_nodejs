'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const encrypt = require('../../lib/encrypt');
const service_admin_userRole = require('../../service/admin_userRole');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      userId: Joi.number().integer().required(),
      roleId: Joi.number().integer().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {userId, roleId} = request.payload;

    service_admin_userRole.save(request.server, userId, roleId).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * delete
 */
module.exports.delete = {
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

    service_admin_userRole.delete(request.server, id).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
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
      userId: Joi.number().integer().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const session = request.auth.credentials;
    const {page, size, userId} = request.query;

    const criteria = {userId};

    service_admin_userRole.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
