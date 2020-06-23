'use strict';
const Joi = require('joi');
const Boom = require('boom');
const service_eco_user = require('../../service/eco_user');
const service_authbase = require('../../rpc/authbase');
const { SuccessModel, ErrorModel } = require('../../config/resModel');

const pageSize = parseInt(process.env.DB_PAGE_SIZE);

module.exports.queryUser = {
  auth: 'jwt',
  description: 'queryUser',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { page, pageSize, search } = request.query;
    try {
      const ret = await service_authbase.QueryUser(page, pageSize, ['id DESC'], search);
      reply(ret);
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel(err));
    }
  }
};

module.exports.queryUserByRoleID = {
  auth: 'jwt',
  description: 'queryUserByRoleID',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(50).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { page, pageSize } = request.query;
    const roleCodes = ['eco-operator','eco-manager','team-first-viewer'];
    let roleIDs = [];
    const allRole = await service_authbase.QueryAllRole();
    if(allRole && allRole.success && allRole.data && allRole.data.length){
      allRole.data.forEach(element => {
        if(roleCodes.includes(element.code)){
          roleIDs.push(element.id);
        }
      });
    }
    let params = {
      page: page,
      size: pageSize,
      order: ["UserID DESC"],
      roleIDs
    };
    try {
      const ret = await service_authbase.QueryUserByRoleID(params);
      reply(new SuccessModel(ret));
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

module.exports.queryEcoUser = {
  auth: 'jwt',
  description: 'queryEcoUser',
  validate: {
    query: {
      page: Joi.number().integer().min(1).default(1),
      pageSize: Joi.number().integer().min(1).max(100).default(pageSize)
    },
    options: {
      allowUnknown: true
    }
  },
  handler: async function (request, reply) {
    const { page, pageSize, TeamID } = request.query;
    const roleCodes = ['club-manager','club-coach'];
    let roleIDs = [];
    const allRole = await service_authbase.QueryAllRole();
    if(allRole && allRole.success && allRole.data && allRole.data.length){
      allRole.data.forEach(element => {
        if(roleCodes.includes(element.code)){
          roleIDs.push(element.id);
        }
      });
    }
    let params = {
      page: 1,
      size: 20000,
      order: ["UserID DESC"],
      roleIDs
    };
    try {
      let userRet = await service_authbase.QueryUserByRoleID(params);
      let teamRet = await service_eco_user.queryAllByTeam(request.server, TeamID, page, pageSize);
      let userList = [];
      let teamList = [];
      if(userRet && userRet.data && userRet.data.rows && userRet.data.rows.length){
        userList = userRet.data.rows;
      }
      if(teamRet && teamRet.rows && teamRet.rows.length){
        teamList = teamRet.rows;
      }
      userList.forEach(u => {
        teamList.forEach(t => {
          if(u.id == t.UserID){
            u.TeamID = t.TeamID;
          }
        });
      });
      let retUserList = [];
      if(TeamID){
        userList.forEach(u => {
          if(u.TeamID && u.TeamID == TeamID){
            retUserList.push(u);
          }
        });
      }else {
        retUserList = userList;
      }
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      const count = retUserList.length;
      retUserList = retUserList.slice(start, end > retUserList.length ? retUserList.length : end);
      const data = {
        count: count,
        rows: retUserList
      };
      reply(new SuccessModel(data));
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

module.exports.queryUserByID = {
  auth: 'jwt',
  description: 'queryUserByID',
  handler: async function (request, reply) {
    const { id, type } = request.query;
    try {
      const ret = await service_authbase.QueryUserByID(id);
      if (type == 'club') {
        const clubData = await service_eco_user.queryOne(request.server, id);
        if (ret && ret.data && clubData) {
          if (ret.data.id == clubData.UserID) {
            ret.data.TeamID = clubData.TeamID;
            ret.data.TeamGroup = clubData.TeamGroup;
          }
        }
      }
      reply(new SuccessModel(ret));
    } catch (err) {
      // eslint-disable-next-line curly
      if (!err.isBoom && err instanceof Error) err = Boom.wrap(err, 400);
      reply(new ErrorModel());
    }
  }
};

module.exports.saveUser = {
  auth: 'jwt',
  description: 'save',
  handler: async function (request, reply) {
    let params = request.payload;
    const { username } = request.auth.credentials;
    try {
      const ret = await service_authbase.SaveEcoUser(params);
      if (params.roles && params.roles.length) {
        for (let key in params.roles) {
          await service_authbase.SaveUserRole(ret.data.id, params.roles[key]);
        }
      }
      if (params.type === 'club') {
        const eco = {
          TeamID: params.TeamID,
          UserName: username,
          UserID: ret.data.id,
        };
        await service_eco_user.save(request.server, eco);
      }
      reply(ret);
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

module.exports.updateUser = {
  auth: 'jwt',
  description: 'update',
  handler: async function (request, reply) {
    let params = request.payload;
    const { username } = request.auth.credentials;
    try {
      if (params.type === 'club') {
        const eco = {
          TeamID: params.TeamID,
          UserName: username,
          UserID: params.id,
        };
        await service_eco_user.update(request.server, eco);
      }
      const ret = await service_authbase.UpdateEcoUser(params);
      const retUser = await service_authbase.QueryUserByID(params.id);
      if(retUser && retUser.success && retUser.data.roles && retUser.data.roles.length) {
        for (let key in retUser.data.roles) {
          const UserRoleID = {
            userID: params.id,
            roleID: retUser.data.roles[key].id
          };
          await service_authbase.DeleteUserRoleByUserIDAndRoleID(UserRoleID);
        }
      }
      if (params.roles && params.roles.length) {
        for (let key in params.roles) {
          await service_authbase.SaveUserRole(params.id, params.roles[key]);
        }
      }
      reply(new SuccessModel(ret));
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

module.exports.deleteUser = {
  auth: 'jwt',
  description: 'deleteUser',
  handler: async function (request, reply) {
    const { id, type } = request.payload;
    let params = { id };
    try {
      await service_authbase.DeleteUser(id);
      if (type == 'club') {
        await service_eco_user.delEcoUser(request.server,params);
      }
      reply(new SuccessModel());
    } catch (err) {
      if (!err.isBoom && err instanceof Error) {
        err = Boom.wrap(err, 400);
      }
      reply(new ErrorModel(err));
    }
  }
};

module.exports.queryEcoRole = {
  auth: 'jwt',
  description: 'queryEcoRole',
  handler: async function (request, reply) {
    let params = request.query;
    let roleCodes = [];
    let retRole = [];
    if (params.type === 'club') {
      roleCodes = ['club-manager','club-coach'];
    } else {
      roleCodes = ['eco-operator','eco-manager','team-first-viewer'];
    }
    const allRole = await service_authbase.QueryAllRole();
    if(allRole && allRole.success && allRole.data && allRole.data.length){
      allRole.data.forEach(element => {
        if(roleCodes.includes(element.code)){
          retRole.push(element);
        }
      });
    }
    reply(new SuccessModel(retRole));
  }
};



