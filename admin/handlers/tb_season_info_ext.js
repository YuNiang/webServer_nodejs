'use strict';
const Joi = require('joi');
const Boom = require('boom');
const tb_season_info_ext = require('../../service/tb_season_info_ext');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);


/**
 * saveMathConfigTime
 */
module.exports.saveMathConfigTime = {
  auth: 'jwt',
  description: 'save',
  handler: function (request, reply) {
    let params = request.payload;
    tb_season_info_ext.saveMathConfigTime(request.server, params).then(data => {
      reply(new SuccessModel());
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

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
    tb_season_info_ext.queryExt(request.server, page, pageSize, [['id', 'DESC']]).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    });
  }
};


