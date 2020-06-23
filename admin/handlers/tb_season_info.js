'use strict';
const Joi = require('joi');
const Boom = require('boom');
const tb_season_info = require('../../service/tb_season_info');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * query
 */
module.exports.queryExt = {
  auth: 'jwt',
  description: 'query',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const { page, pageSize } = request.query;
    tb_season_info.queryExt(request.server, page, pageSize, [['id', 'DESC']]).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    });
  }
};

