'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const service_admin_interface = require('../../service/admin_interface');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    service_admin_interface.query(request.server).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
