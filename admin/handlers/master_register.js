'use strict';
const Joi = require('joi');
const Boom = require('boom');
const moment = require('moment-timezone');
const util_ip = require('../../lib/ip');
const service_master_register = require('../../service/master_register');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
      order: Joi.string().valid('id', 'rmb_balance', 'btc_balance', 'bt2_balance', 'bt3_balance', 'total').default('id'),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    const session = request.auth.credentials;
    const query = request.query;
    const order = query.order;
    const offset = --query.page * query.size;

    const criteria = {};

    //查询用户
    Master_register.findAndCountAll({
      raw: true,
      where: criteria,
      order: [[order, 'DESC']],
      offset: offset,
      limit: query.size
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询推广大师
 */
module.exports.queryMarketingMaster = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    const session = request.auth.credentials;
    const query = request.query;
    const offset = --query.page * query.size;

    const criteria = {
      marketingMasterLevel: {$ne: 0}
    };

    //查询用户
    Master_register.findAndCountAll({
      raw: true,
      where: criteria,
      order: [['id', 'DESC']],
      offset: offset,
      limit: query.size
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query root
 */
module.exports.queryRoot = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {page, size} = request.query;

    const criteria = {
      isRoot: 1
    };

    service_master_register.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query inviter
 */
module.exports.queryInviter = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
      order: Joi.string().valid('id', 'level1Count', 'level1Profit', 'totalLevelProfit').default('totalLevelProfit')
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {page, size, order} = request.query;

    const criteria = {
      level1Count: {$ne: 0}
    };

    service_master_register.query(request.server, criteria, page, size, [[order, 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 根据资产查询
 */
module.exports.queryByAsset = {
  // auth: 'jwt',
  validate: {
    query: {
      coin: Joi.string().required(),
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).default(pageSize)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    const query = request.query;

    return service_master_register.queryByAsset(request.server, query.coin, query.page, query.size).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query auth profit
 */
module.exports.queryAuthProfit = {
  auth: 'jwt',
  description: 'query auth profit',
  response: {
    schema: Joi.object({
      username: Joi.string(),
      realname: Joi.string(),
      idcard: Joi.string(),
      authRequired: Joi.number().integer(),
      authentication: Joi.object({})
    })
  },
  validate: {
    params: {
      usernames: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {usernames} = request.params;
    const array_username = usernames.split(',');

    service_master_register.queryAuthProfit(request.server, array_username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query same withdraw address
 */
module.exports.querySameWithdrawAddress = {
  auth: 'jwt',
  description: 'query same withdraw address',
  response: {
    schema: Joi.object({
      address: Joi.string(),
      count: Joi.number().integer(),
    })
  },
  validate: {
    query: {
      coin: Joi.string().required(),
      address: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {coin, address} = request.query;

    service_master_register.querySameWithdrawAddress(request.server, coin, address).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query same withdraw address count
 */
module.exports.querySameWithdrawAddressCount = {
  auth: 'jwt',
  description: 'query same withdraw address count',
  response: {
    schema: Joi.object({
      address: Joi.string(),
      count: Joi.number().integer(),
    })
  },
  validate: {
    query: {
      coin: Joi.string().required(),
      addresses: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {coin, addresses} = request.query;
    const array_address = addresses.split(',');

    service_master_register.querySameWithdrawAddressCount(request.server, coin, array_address).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 搜索
 */
module.exports.search = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1),
      search: Joi.string().required().max(50)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const query = request.query;
    const offset = (query.page ? query.page - 1 : 0) * pageSize;

    const criteria = {
      $or: [
        {userId: query.search},
        {username: query.search},
        {realname: query.search},
        {$and: Sequelize.fn('FIND_IN_SET', query.search, Sequelize.col('tags'))}
      ]
    };
    //查询用户
    Master_register.findAndCountAll({
      where: criteria,
      order: [['id', 'DESC']],
      offset: offset,
      limit: pageSize
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 聚合--某个时间段的数据
 */
module.exports.aggregation = {
  auth: 'jwt',
  validate: {
    query: {
      startTime: Joi.string().required(),
      endTime: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    // const session = request.auth.credentials;
    const query = request.query;

    Sequelize.query(`
    select 
      str_to_date(joindate, '%Y%m%d') as joindate, 
      count(id) as count, 
      sum(case realname when '' then 0 else 1 end) as realNameCount 
      from master_register 
      where
        realname != '体验用户'
        and lastlogintime != ''
        and joindate >= '${moment(query.startTime).format('YYYYMMDDHHmm')}'
        and joindate < '${moment(moment(new Date(moment(query.endTime)).getTime() + 24 * 3600000).format('YYYY-MM-DD')).format('YYYYMMDDHHmm')}'
      group by str_to_date(joindate, '%Y%m%d')
      order by str_to_date(joindate, '%Y%m%d') desc`
    ).then(data => {
      reply(data[0]);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 聚合--所有数据
 */
module.exports.aggregationAll = {
  // auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    // const session = request.auth.credentials;
    // const query = request.query;

    Sequelize.query(`
    select
      count(id) as count,
      sum(case realname when '' then 0 else 1 end) as realNameCount,
      sum(subscribe) as subscribeCount
      from master_register 
      where
        realname != '体验用户'
        and lastlogintime != ''`
    ).then(data => {
      reply(data[0][0]);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询（username）
 */
module.exports.queryByUsername = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const params = request.params;

    const criteria = {username: params.username};

    //查询用户
    Master_register.findOne({
      where: criteria
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * query invitee by userId
 */
module.exports.queryInviteeByUserId = {
  auth: 'jwt',
  validate: {
    params: {
      userId: Joi.string().required()
    },
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
      level: Joi.number().integer().min(1).max(6)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {

    const {userId} = request.params;
    const {page, size, level} = request.query;

    const criteria = level ? {[`parent${level}Id`]: userId} : {inviterId: userId};

    service_master_register.query(request.server, criteria, page, size, [['id', 'DESC']]).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      return reply(err)
    });
  }
};

/**
 * 聚合用户相同IP数量，身份证，注册IP
 */
module.exports.aggregationIP = {
  auth: 'jwt',
  validate: {
    query: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const query = request.query;

    const criteria = {
      username: query.username.split(',')
    };
    //查询用户
    Master_register.findAll({
      raw: true,
      attributes: [
        'username',
        'regip',
        'idcard',
        [Sequelize.fn('COUNT', Sequelize.col('regip')), 'IPCount']
      ],
      where: criteria,
      group: 'username'
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询相同IP数量
 */
module.exports.queryIPCountByUsername = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const params = request.params;

    let master_register;

    const criteria = {
      username: params.username
    };
    //查询用户
    Master_register.findOne({
      raw: true,
      attributes: ['username', 'regip', 'idcard'],
      where: criteria
    }).then(data => {
      master_register = data ? data : {};
      if (!data) return Promise.resolve(0);
      return Master_register.count({
        where: {
          regip: data.regip,
          username: {$notLike: 'demo%'}
        }
      });
    }).then(data => {
      master_register.IPCount = data;
      reply(master_register);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 修改
 *
 * 目前该接口仅供内部使用
 * 不做任何参数校验
 */
module.exports.update = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    payload: {},
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const params = request.params;
    const payload = request.payload;

    //lastdealdate不更新
    delete payload.lastdealdate;
    delete payload.howmanydeal;

    const criteria = {username: params.username};

    //查询用户
    Master_register.update(payload, {
      where: criteria
    }).then(data => {
      if (data[0] != 1) throw Boom.badRequest('用户不存在');
      return Master_register.findOne({
        where: criteria
      });
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * auto register
 */
module.exports.autoRegister = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().required().max(30),
      password: Joi.string().required().min(6).max(20),
      accountType: Joi.string().required().valid('mobile', 'email'),
      countryCode: Joi.string()
        .when('accountType', {
          is: 'mobile',
          then: Joi.required()
        }),
      inviterId: Joi.string().max(30)
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const payload = request.payload;
    service_master_register.autoRegister(request.server, payload.username, payload.password, payload.accountType, payload.countryCode, util_ip.getClientIp(request), payload.inviterId).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 设置推广大师等级
 */
module.exports.setMarketingMasterLevel = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    payload: {
      marketingMasterLevel: Joi.number().integer().valid(0, 1, 2, 3, 4, 5).required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Master_register = DB.getModel('master_register');
    // const session = request.auth.credentials;
    const {username} = request.params;
    const {marketingMasterLevel} = request.payload;

    service_master_register.setMarketingMasterLevel(request.server, username, marketingMasterLevel).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * freeze
 */
module.exports.freeze = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;

    service_master_register.freeze(request.server, username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * unfreeze
 */
module.exports.unfreeze = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;

    service_master_register.unfreeze(request.server, username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * set is root
 */
module.exports.setIsRoot = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    payload: {
      isRoot: Joi.number().integer().valid(0, 1).required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;
    const {isRoot} = request.payload;

    service_master_register.setIsRoot(request.server, username, isRoot).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * login
 */
module.exports.login = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;

    service_master_register.loginByAdmin(request.server, username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * auth required
 */
module.exports.authRequired = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;

    service_master_register.authRequired(request.server, username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * tags
 */
module.exports.tags = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    payload: {
      tags: Joi.array().items(Joi.string()).required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;
    const {tags} = request.payload;

    service_master_register.tags(request.server, username, tags).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * set vip level
 */
module.exports.setVipLevel = {
  auth: 'jwt',
  validate: {
    params: {
      username: Joi.string().required()
    },
    payload: {
      vipLevel: Joi.number().integer().min(0).max(9).required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.params;
    const {vipLevel} = request.payload;

    service_master_register.setVipLevel(request.server, username, vipLevel).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};
