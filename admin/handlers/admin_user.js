'use strict';
const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken')
const moment = require('moment-timezone');
const encrypt = require('../../lib/encrypt');
const service_admin_user = require('../../service/admin_user');
const service_admin_userRole = require('../../service/admin_userRole');
const pageSize = parseInt(process.env.DB_PAGE_SIZE);
const rpcUserbase = require('../../rpc/userbase');

const {SuccessModel, ErrorModel} = require('../../config/resModel');

/**
 * 登录
 */
module.exports.login = {
  validate: {
    payload: {
      code: Joi.string().min(2).max(100).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    // const session = request.auth.credentials;
    const {code} = request.payload;

    // special user for dev
    if (process.env.NODE_ENV == 'development' && code == 'development') {
      const data = await service_admin_user.login(request.server, 'admin', "fromweixin");
      return reply(data).header("Authorization", data.authorization);
    }

    try {
      let response = await rpcUserbase.login(code);
      if (!response.success) {
        throw new Error(response.errMsg);
      }

      const data = await service_admin_user.login(request.server, response.loginResult.uuid, "fromweixin");
      reply(data).header("Authorization", data.authorization);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    }
  }
};

/**
 * 注册
 */
module.exports.register = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().min(2).max(50).required(),
      idname: Joi.string().min(2).max(50).required(),
      phone: Joi.string().min(2).max(50).required(),
      iTeamId: Joi.number()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const {username, idname, phone, iTeamId} = request.payload;
    const password = "fromweixin";
    service_admin_user.register(request.server, username, password, idname, phone, iTeamId).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) {err = Boom.wrap(err, 400);}
      reply(err);
    });
  }
};

/**
 * 修改密码
 */
module.exports.updatePassword = {
  auth: 'jwt',
  validate: {
    payload: {
      password: Joi.string().min(6).max(20).required(),
      newPassword: Joi.string().min(6).max(20).required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const session = request.auth.credentials;
    const {password, newPassword} = request.payload;

    service_admin_user.updatePassword(request.server, session.username, password, newPassword).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询
 */
module.exports.query = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Admin_user = DB.getModel('admin_user');
    const session = request.auth.credentials;
    const query = request.query;
    const offset = --query.page * query.size;

    Admin_user.findAndCountAll({
      attributes: ['id', 'adminname', 'idcard', 'idname', 'phone', 'username', 'lastLoginAt', 'createdAt', 'email'],
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

module.exports.query_coach = {
  auth: 'jwt',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      size: Joi.number().integer().min(1).max(50).default(pageSize),
      teamIds: Joi.string()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: async function (request, reply) {
    const query = request.query;
    const offset = --query.page * query.size;
    try {
      let sql = "select a.adminname,a.username,a.idcard,a.idname,a.phone,b.iRoleId,b.iTeamId from admin_user as a inner join tb_admin_info as b on a.username = b.sUnionid where a.id not in (select distinct userId from admin_userRole where deletedAt is null) ";
      let cntSql = "select count(*) as total from admin_user as a inner join tb_admin_info as b on a.username = b.sUnionid where a.id not in (select distinct userId from admin_userRole where deletedAt is null) ";
      if (query.teamIds) {
        sql = `${sql} and b.iTeamId in(${query.teamIds})`;
        cntSql = `${cntSql} and b.iTeamId in (${query.teamIds})`;
      }
      sql = `${sql} order by a.createdAt limit ${offset},${query.size}`;
      const data = await global.Sequelize.query(sql, {type: global.Sequelize.QueryTypes.SELECT});
      const cnt = await global.Sequelize.query(cntSql, {type: global.Sequelize.QueryTypes.SELECT});
      reply({"rows": data, "count": cnt[0].total});
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(err);
    }
  }
};

/**
 * 查询当前用户信息
 */
module.exports.queryForCurrentUser = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Admin_user = DB.getModel('admin_user');
    const session = request.auth.credentials;

    Admin_user.findOne({
      attributes: ['id', 'username', 'lastLoginAt', 'createdAt'],
      where: {
        username: session.username
      }
    }).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询当前用户路由权限
 */
module.exports.queryRouteForCurrentUser = {
  auth: 'jwt',
  validate: {
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const DB = request.getDb(process.env.DB_DBNAME);
    const Admin_user = DB.getModel('admin_user');
    const session = request.auth.credentials;

    service_admin_user.queryRoute(request.server, session.username).then(data => {
      reply(data);
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    });
  }
};

/**
 * 查询生态人员管理数据
 */
module.exports.queryInsideList = {
  auth: 'jwt',
  description: 'queryInsideList',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {page, pageSize} = request.query;
    service_admin_user.queryInsideList(request.server, page, pageSize, [['id', 'DESC']]).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    });
  }
};

/**
 * 根据ID查询生态人员
 */
module.exports.queryInsideById = {
  auth: 'jwt',
  description: 'queryInsideById',
  validate: {
    query: {
      username: Joi.string().required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { username } = request.query;
    try {
      const data = await service_admin_user.queryOne(request.server, username);
      reply(new SuccessModel(data));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

/**
 * 根据ID查询俱乐部人员
 */
module.exports.queryCulbById = {
  auth: 'jwt',
  description: 'queryCulbById',
  validate: {
    query: {
      username: Joi.string().min(2).max(50).required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const {username} = request.query;
    service_admin_user.queryCulbById(request.server, username).then(data => {
      reply(new SuccessModel(data));
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 生态人员添加
 */
module.exports.insideStaffSave = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().min(2).max(50).required(),
      idname: Joi.string().min(2).max(50).required(),
      phone: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(2).max(50).required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    params.password = "fromweixin";
    service_admin_user.insideStaffSave(request.server, params).then(data => {
      reply(new SuccessModel());
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      if (err.message === 'AlreadyExist') {
        reply(new new ErrorModel({ message: '该人员已经存在！'}));
      }
      reply(new new ErrorModel(err));
    });
  }
};

/**
 * 生态人员修改
 */
module.exports.insideStaffUpdate = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().min(2).max(50).required(),
      idname: Joi.string().min(2).max(50).required(),
      phone: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(2).max(50).required(),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    const obj = {
      adminname: params.adminname,
      username: params.username,
      password: 'fromweixin',
      idcard: '330822199308989890',
      idname: params.idname,
      phone: params.phone
    }
    service_admin_user.insideStaffUpdate(request.server, obj).then(data => {
      reply(new SuccessModel());
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    });
  }
};

/**
 * 生态人员删除
 */
module.exports.insideStaffDel = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().required()
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    service_admin_user.insideStaffDel(request.server, params.username).then(data => {
      reply(new SuccessModel());
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 查询俱乐部数据
 */
module.exports.queryCulbList = {
  auth: 'jwt',
  description: 'queryCulbList',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize),
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { page, pageSize } = request.query;
    let params = {};
    if (request.query.teamID) {
      params.teamID = request.query.teamID;
    }
    try {
      let result = {
        count: 0,
        rows: []
      };
      const data = await service_admin_user.queryCulbList(request.server, params, page, pageSize);
      let ids = [];
      let list = data && data.rows ? data.rows : [];
      list.forEach(item => {
        ids.push(item.id);
      });
      if (ids.length) {
        const ret = await service_admin_userRole.queryRoleList(request.server, ids.join(','))
        list.forEach(i => {
          ret && ret.length && ret.forEach(u => {
            if (i.id === u.userId) {
              if (!i.role) {
                i.role = [];
              }
              i.role.push(u.roleId);
            }
          });
        });
        result.count = data.count,
        result.rows = list;
        reply(new SuccessModel(result));
      }
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }

    // await service_admin_user.queryCulbList(request.server, params, page, pageSize).then(data => {
    //   let ids = [];
    //   let list = data && data.rows ? data.rows : [];
    //   list.forEach(item => {
    //     ids.push(item.id);
    //   })
    //   if (ids.length) {
    //     service_admin_userRole.queryRoleList(request.server, ids.join(',')).then(res => {
    //       list.forEach(i => {
    //         res && res.forEach(u => {
    //           if (i.id === u.userId) {
    //             if (!i.role) {
    //               i.role = [];
    //             }
    //             i.role.push(u.roleId);
    //           }
    //         })
    //       })
    //       result.count = data.count,
    //         result.rows = list
    //       reply(new SuccessModel(result));
    //     })
    //   } else {
    //     reply(new SuccessModel(result));
    //   }
    // }).catch(err => {
    //   if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
    //   reply(new ErrorModel());
    // });
  }
};

/**
 * 俱乐部人员新增
 */
module.exports.culbStaffSave = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().min(2).max(50).required(),
      idname: Joi.string().min(2).max(50).required(),
      phone: Joi.string().min(2).max(50).required(),
      email: Joi.string().min(2).max(50).required(),
      roleId: Joi.string().required(),
      teamID: Joi.number().integer().required(),
      TeamGroup: Joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    params.password = "fromweixin";
    // 1、保存到用户表 Admin_user
    // 2、同时保存到 admin_user_team
    // 3、同时保存到 admin_userRole
    service_admin_user.culbStaffSave(request.server, params).then(data => {
      const roleIds = params.roleId ? (params.roleId).split(',') : '';
      let ur = [];
      roleIds.forEach(item => {
        ur.push({
          teamID: params.teamID,
          userId: data.id,
          roleId: item,
          createdAt: new Date()
        });
      });
      service_admin_user.userRoleSave(request.server, ur).then(res => {
        reply(new SuccessModel());
      });
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 俱乐部人员修改 目前只能修改角色
 */
module.exports.culbStaffUpdate = {
  auth: 'jwt',
  validate: {
    payload: {
      id: Joi.number().required(),
      roleId: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    const roleIds = params.roleId ? (params.roleId).split(',') : '';
    let ur = [];
    roleIds.forEach(item => {
      ur.push({
        userId: params.id,
        roleId: Number(item),
        updatedAt: new Date()
      });
    });
    service_admin_user.delUserRole(request.server, params.id).then(res => {
      service_admin_user.culbStaffUpdate(request.server, ur).then(data => {
        reply(new SuccessModel());
      })
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
};

/**
 * 俱乐部人员删除
 */
module.exports.culbStaffDel = {
  auth: 'jwt',
  validate: {
    payload: {
      username: Joi.string().required(),
    },
    options: {
      allowUnknown: false
    }
  },
  handler: function (request, reply) {
    const params = request.payload;
    service_admin_user.delUser(request.server, params.username).then(data => {
      reply(new SuccessModel());
    }).catch(err => {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    });
  }
}

/**
 * 俱乐部
 */
module.exports.queryLoginUserTeam = {
  auth: 'jwt',
  handler: async function (request, reply) {
    const { teamID, teamGroup } = request.auth.credentials;
    try {
      const ret = await service_admin_user.queryLoginUserTeam(request.server, teamID, teamGroup);
      reply(new SuccessModel(ret));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(err);
    }
  }
}


