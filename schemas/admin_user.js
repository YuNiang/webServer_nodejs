
const Joi = require('joi');

// schema
const schema = Joi.object({
  id: Joi.invalid(null),
  username: Joi.string().max(20).invalid(null).allow(''),
  password: Joi.string().max(100).invalid(null).allow(''),
  lastLoginAt: Joi.date().allow(null),
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
