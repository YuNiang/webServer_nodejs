'use strict';
const Boom = require('boom');
const tb_player_info_action = require('../../service/tb_player_info_action');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

module.exports.query = {
  auth: 'jwt',
  description: 'query',
  handler: async function (request, reply) {
    const { teamID } = request.auth.credentials;
    try {
      const data = await tb_player_info_action.queryAll(request.server, teamID);
      reply(new SuccessModel(data));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};