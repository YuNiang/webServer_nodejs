'use strict';
const Joi = require('joi');
const Boom = require('boom');
const util_file = require('../../lib/file');
const { signatureUrl } = require('../../lib/file');
const { SuccessModel, ErrorModel } = require('../../config/resModel');

/**
 * upload
 */
module.exports.upload = {
  auth: 'jwt',
  payload: {
    output: 'file',
    maxBytes: 20 * 1024 * 1024
  },
  validate: {
    payload: {
      file: Joi.required(),
      dir: Joi.string(),
      protect: Joi.number().integer().valid(0, 1).default(1)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {file: {filename, path, headers: {'content-type': contentType}}, dir, protect} = request.payload;

    util_file.saveWithFile(filename, path, contentType, dir, protect).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 上传文件生成URL 路径
 */
module.exports.generationURL = {
  auth: 'jwt',
  description: 'POST',
  validate: {
    payload: {
      file: Joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const { file } = request.payload;
    signatureUrl(file).then((res)=> {
      reply(new SuccessModel(res));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel({ message: '系统异常，稍后再试！' }));
    });
  }
};
