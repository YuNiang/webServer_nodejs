'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const encrypt = require('../../lib/encrypt');
const service_admin_roleRoute = require('../../service/admin_roleRoute');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * save
 */
module.exports.save = {
  auth: 'jwt',
  validate: {
    payload: {
      roleId: Joi.number().integer().required(),
      routeId: Joi.number().integer().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {roleId, routeId} = request.payload;

    service_admin_roleRoute.save(request.server, roleId, routeId).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * bulk save
 */
module.exports.bulkSave = {
  auth: 'jwt',
  validate: {
    payload: {
      roleId: Joi.number().integer().required(),
      routeIds: Joi.array().min(1).required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {roleId, routeIds} = request.payload;

    service_admin_roleRoute.bulkSave(request.server, roleId, routeIds).then(data => {
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

    service_admin_roleRoute.delete(request.server, id).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * bulk delete
 */
module.exports.bulkDelete = {
  auth: 'jwt',
  validate: {
    params: {
      idStr: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    // const session = request.auth.credentials;
    const {idStr} = request.params;
    const ids = idStr.split(',');

    service_admin_roleRoute.bulkDelete(request.server, ids).then(data => {
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
      roleIdStr: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const session = request.auth.credentials;
    const {page, size, roleIdStr} = request.query;

    const roleIds = roleIdStr.split(',');

    const criteria = {roleId: roleIds};

    service_admin_roleRoute.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
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
module.exports.queryAll = {
  auth: 'jwt',
  validate: {
    query: {
      roleIdStr: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const session = request.auth.credentials;
    const {roleIdStr} = request.query;

    const roleIds = roleIdStr.split(',');

    const criteria = {roleId: roleIds};

    service_admin_roleRoute.queryAll(request.server, criteria, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
