
const Joi = require('joi');

// schema
const schema = Joi.object({
  id: Joi.invalid(null),
  username: Joi.string().max(20).invalid(null).allow(''),
  api: Joi.string().max(100).invalid(null).allow(''),
  method: Joi.string().max(10).invalid(null).allow(''),
  query: Joi.string().allow(null),
  payload: Joi.string().allow(null),
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
