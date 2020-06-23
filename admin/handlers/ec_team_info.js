'use strict';
const Boom = require('boom');
const service_ec_team_info = require('../../service/ec_team_info');
const { SuccessModel, ErrorModel } = require('../../config/resModel');

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  handler: async function (request, reply) {
    try {
      const ret = await service_ec_team_info.query();
      reply(new SuccessModel(ret));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

