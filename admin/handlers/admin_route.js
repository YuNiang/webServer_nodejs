'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const encrypt = require('../../lib/encrypt');
const service_admin_route = require('../../service/admin_route');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      name: Joi.string().min(2).max(20).required(),
      route: Joi.string().min(2).max(1000).required(),
      remark: Joi.string().min(6).max(200).required(),
      interfaces: Joi.array().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {name, route, remark, interfaces} = request.payload;

    service_admin_route.save(request.server, name, route, remark, interfaces).then(data => {
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
      route: Joi.string().min(2).max(1000).required(),
      remark: Joi.string().min(6).max(200).required(),
      interfaces: Joi.array().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {id} = request.params;
    const {name, route, remark, interfaces} = request.payload;

    service_admin_route.update(request.server, id, name, route, remark, interfaces).then(data => {
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

    service_admin_route.delete(request.server, id).then(data => {
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

    service_admin_route.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
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
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const session = request.auth.credentials;

    const criteria = {};

    service_admin_route.queryAll(request.server, criteria, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
