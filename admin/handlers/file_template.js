'use strict';
const Joi = require('joi');
const Boom = require('boom');
const service_file_template = require('../../service/file_template');
const { SuccessModel, ErrorModel } = require('../../config/resModel');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

module.exports.query = {
  auth: 'jwt',
  description: 'query',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(500).default(pageSize),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { iType, page, pageSize } = request.query;
    let criteria = {};
    if (iType) {
      criteria.iType = iType;
    }
    const ret = await service_file_template.query(criteria, page, pageSize);
    if (ret && ret.rows) {
      reply(new SuccessModel(ret));
    } else {
      reply(new ErrorModel());
    }
  }
};

module.exports.queryById = {
  auth: 'jwt',
  description: 'query by id',
  validate: {
    query: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { id } = request.query;
    if (id) {
      try {
        const ret = await service_file_template.queryOne(request.server, id);
        reply(new SuccessModel(ret));
      } catch (err) {
        if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
        reply(new ErrorModel(err));
      }
    } else {
      reply(new ErrorModel('id 必传'));
    }
  }
};

module.exports.save = {
  auth: 'jwt',
  description: 'save',
  validate: {
    payload: {
      iType: Joi.string().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const params = request.payload;
    try {
      const ret = await service_file_template.save(request.server, params);
      reply(new SuccessModel({ id: ret.id }));
    } catch(err) {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(new ErrorModel(err));
    }
  }
};

module.exports.update = {
  auth: 'jwt',
  description: 'update',
  validate: {
    payload: {
      id: Joi.number().integer().required(),
      iType: Joi.string().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const params = request.payload;
    if (params && params.iType && params.id) {
      try {
        await service_file_template.update(request.server, params);
        reply(new SuccessModel());
      } catch(err) {
        if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
        reply(new ErrorModel(err));
      }
    } else {
      reply(new ErrorModel("缺少参数！"));
    }
  }
};

module.exports.isStatus = {
  auth: 'jwt',
  description: 'isStatus',
  validate: {
    payload: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    if (params && params.id !== null) {
      service_file_template.isStatus(request.server, params.id).then(data => {
        reply(new SuccessModel());
      }).catch(err => {
        if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
        reply(new ErrorModel(err));
      });
    } else {
      reply(new ErrorModel());
    }
  }
};

module.exports.delete = {
  auth: 'jwt',
  description: 'delete',
  validate: {
    payload: {
      id: Joi.number().integer().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { id } = request.payload;
    if (id) {
      try {
        await service_file_template.delete(request.server, id);
        reply(new SuccessModel());
      } catch(err) {
        if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
        reply(new ErrorModel(err));
      }
    } else {
      reply(new ErrorModel("缺少 id 参数"));
    }
  }
};
