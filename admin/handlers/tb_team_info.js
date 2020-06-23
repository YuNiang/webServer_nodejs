'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const service_tb_team_info = require('../../service/tb_team_info');
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
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {page, size} = request.query;

    const criteria = {};

    service_tb_team_info.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 批量查询
 */
module.exports.queryBulk = {
  auth: 'jwt',
  validate: {
    query: {
      ids: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {ids} = request.query;

    const criteria = {
      id: ids.split(',')
    };

    service_tb_team_info.queryAll(request.server, criteria).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
