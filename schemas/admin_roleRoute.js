
const Joi = require('joi');

// schema
const schema = Joi.object({
  id: Joi.invalid(null),
  roleId: Joi.number().integer().invalid(null).description('角色ID'),
  routeId: Joi.number().integer().invalid(null).description('路由ID'),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
  deletedAt: Joi.date().allow(null)
}).unknown();

// list
exports.list = Joi.object({
  count: Joi.number().integer(),
  rows: Joi.array().items(schema)
});

// detail
exports.detail = schema;
