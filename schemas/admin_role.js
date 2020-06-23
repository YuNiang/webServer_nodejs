
const Joi = require('joi');

// schema
const schema = Joi.object({
  id: Joi.invalid(null),
  name: Joi.string().max(20).invalid(null).allow('').description('名称'),
  remark: Joi.string().max(200).invalid(null).allow('').description('备注'),
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
