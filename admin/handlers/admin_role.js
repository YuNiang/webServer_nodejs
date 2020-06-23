'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const encrypt = require('../../lib/encrypt');
const service_admin_role = require('../../service/admin_role');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      name: Joi.string().min(2).max(20).required(),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {name, remark} = request.payload;

    service_admin_role.save(request.server, name, remark).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * update
 */
module.exports.update = {
  auth: 'jwt',
  validate: {
    params: {
      id: Joi.number().integer().required(),
    },
    payload: {
      name: Joi.string().min(2).max(20).required(),
      remark: Joi.string().min(6).max(200).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {id} = request.params;
    const {name, remark} = request.payload;

    service_admin_role.update(request.server, id, name, remark).then(data => {
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

    service_admin_role.delete(request.server, id).then(data => {
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
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const session = request.auth.credentials;
    const {page, size} = request.query;

    const criteria = {};

    service_admin_role.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
