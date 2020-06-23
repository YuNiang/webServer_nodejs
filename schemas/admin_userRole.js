
const Joi = require('joi');

// schema
const schema = Joi.object({
  id: Joi.invalid(null),
  userId: Joi.number().integer().invalid(null).description('用户ID'),
  roleId: Joi.number().integer().invalid(null).description('角色ID'),
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
