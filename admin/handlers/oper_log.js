'use strict';
const Joi = require('joi');
const Boom = require('boom');
const moment = require('moment');
const service_tb_player_info = require('../../service/tb_player_info');
const service_tb_coach_info = require('../../service/tb_coach_info');
const service_audit_order = require('../../service/audit_order');
const service_oper_log = require('../../service/oper_log');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * query
 */
module.exports.query = {
  auth: 'jwt',
  description: 'query',
  validate: {
    query: {
      orderID: Joi.number(),
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { page, pageSize, orderID } = request.query;
    try {
      const coachData = await service_oper_log.queryAll(request.server, page, pageSize, orderID);
      reply(new SuccessModel(coachData));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};