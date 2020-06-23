const moment = require('moment-timezone');
const JWT = require('jsonwebtoken')
const config = require('../config/config');
const util_encrypt = require('../lib/encrypt');
const service_admin_auth = require('../service/admin_auth');
const server_ec_team_info = require('../service/ec_team_info');


/**
 * login
 * @param server
 * @param username
 * @param password
 * @returns {*}
 */
exports.login = async (server, username, password) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_user = DB.getModel('admin_user');
  const Admin_info = DB.getModel('tb_admin_info');
  let admin_user;

  const criteria = {
    username,
    password: util_encrypt.AHMD5(password)
  };

  return Admin_user.findOne({
    where: criteria
  }).then(data => {
    if (!data) throw new Error('account or password incorrect');

    admin_user = data;

    // init permission
    return service_admin_auth.init(server, username);
  }).then(() => {

    return this.queryUserTeam(server, username);
  }).then((team) => {
    admin_user.teamID = team && team.teamID ? team.teamID : 8000001;
    admin_user.teamGroup = team && team.TeamGroup ? team.TeamGroup : '2';
    // query route
    return this.queryRoute(server, username);
  }).then(route => {

    // update lastLoginAt
    Admin_user.update({
      lastLoginAt: new Date()
    }, {where: criteria});

    const session = {
      type: 'admin',
      username: username,
      expire: Date.now() + 24 * 3600000, //24小时
      teamID: admin_user.teamID,
      teamGroup: admin_user.teamGroup
    };
    const token = JWT.sign(session, process.env.JWT_SECRET);
    return {model: admin_user, authorization: token, route};
  });
};

/**
 * register
 * @param server
 * @param username
 * @param password
 */
exports.register = async (server, username, password, idname, phone, iTeamId) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const Admin_Info = DB.getModel('tb_admin_info');
  const ai = await Admin_Info.findOne({where: {sUnionid: username}});
  if (!ai) {
    throw new Error('user not exist');
  }
  // query whether registered
  return Admin_user.findOne({
    where: {username}
  }).then(data => {
    if (data) {
      throw new Error('already registered');
    }

    // doc
    const docForWallet = {
      username,
      adminname: ai.sUserName,
      password: util_encrypt.AHMD5(password),
      idname: idname,
      phone: phone
    };

    // transaction
    return global.Sequelize.transaction(t => {
      // doc
      return Admin_user.findOrCreate({
        where: {username},
        defaults: docForWallet,
        transaction: t
      }).then(async ([model, created]) => {
        if (!created) {
          throw new Error('already registered');
        }
        if(iTeamId){
          await Admin_Info.update({iRoleId:3,iTeamId:iTeamId},{where:{sUnionid:username}});
        }
        return model;
      });
    });
  });
};

/**
 * update password
 * @param server
 * @param username
 * @param password
 * @param newPassword
 */
exports.updatePassword = (server, username, password, newPassword) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_user = DB.getModel('admin_user');

  // query
  return Admin_user.findOne({
    where: {username}
  }).then(data => {
    if (!data) throw new Error('account does not exist');
    if (data.password != util_encrypt.AHMD5(password)) throw new Error('the original password is wrong');
    if (password == newPassword) throw new Error('the new password can not be the same as the original password');


    // doc
    const docForWallet = {
      password: util_encrypt.AHMD5(newPassword)
    };

    // transaction
    return Sequelize.transaction(t => {

      // doc
      return Admin_user.update(docForWallet, {
        where: {username, password: util_encrypt.AHMD5(password)},
        transaction: t
      }).then(data => {
        if (data[0] != 1) throw new Error('the original password is wrong');

        return;
      });
    });
  });
};

/**
 *
 * @param server
 * @param username
 */
exports.queryRoute = (server, username) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];

  const Admin_user = DB.getModel('admin_user');
  const Admin_userRole = DB.getModel('admin_userRole');
  const Admin_roleRoute = DB.getModel('admin_roleRoute');
  const Admin_route = DB.getModel('admin_route');

  let admin_user;
  let admin_userRole;
  let admin_roleRoute;

  // query user
  return Admin_user.findOne({where: {username}}).then(data => {
    admin_user = data;

    // query userRole
    return Admin_userRole.findAll({where: {userId: admin_user.id}});
  }).then(data => {
    admin_userRole = data;

    // query roleRoute
    const array_roleId = [];
    admin_userRole.forEach(item => array_roleId.push(item.roleId));
    return Admin_roleRoute.findAll({where: {roleId: array_roleId}});
  }).then(data => {
    admin_roleRoute = data;

    // query route
    const array_routeId = [];
    admin_roleRoute.forEach(item => array_routeId.push(item.routeId));
    return Admin_route.findAll({where: {id: array_routeId}});
  });

};

/**
 * @param server
 * @param queryOne
 */
exports.queryOne = async (server, username, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const criteria = {
    username
  };

  const ret = await Admin_user.findOne({
    attributes,
    raw: true,
    where: criteria
  });
  return ret;
};

/**
 * @param server
 * @param queryInsideList
 */
exports.queryInsideList = async (server, page, pageSize) => {
  let sql = `select u.* from admin_user as u where deletedAt is null `;
  let countSql = ` select count(*) as num from ( ${sql} ) as a `;
  let count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });
  sql += ' limit ' + (--page*pageSize) + ',' + pageSize;
  let data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return {
    rows: data,
    count: count[0].num
  };
};

exports.queryUserTeam = async (server, username) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('eco_user');
  try {
    return Admin_user.findOne({where: { username }});
  } catch (error) {
    console.log(error, 'query eco_user error');
  }
};

exports.queryLoginUserTeam = async (server, teamID, teamGroup) => {
  try {
    const ret = await server_ec_team_info.query();
    let tmp = {};
    if (ret && ret.length) {
      ret.forEach(t => {
        if (t.id == teamID) {
          tmp = {
            'ID':t.id, 'TeamDes': t.TeamDes
          };
          if(teamGroup == '1') {
            tmp['1'] = t;
          } else {
            tmp['2'] = t;
          }
        }
      });
    }
    return tmp;
  } catch (error) {
    console.log(error, 'query queryLoginUserTeam error');
  }
};

exports.queryCulbList = async (server, criteria, page, pageSize) => {
  let sql = `select
    u.*,
    t.id as teamId,
    t.TeamDes
    from admin_user_team as ut
    inner join admin_user as u
    on ut.username = u.username
    inner join tb_team_info as t
    on ut.teamID = t.id
    where u.deletedAt is null
  `
  if (criteria.teamID) {
    sql = `${sql} and ut.teamID in ( ${criteria.teamID} ) `;
  };

  let countSql = ` select count(*) as num from ( ${sql} ) as a `;
  const count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });
  sql +=  'limit ' + (--page*pageSize) + ',' + pageSize;
  const data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return {
    rows: data,
    count: count[0].num
  };
};

exports.queryCulbById = async (server, username) => {
  let sql = `select
    u.*,
    t.id as teamId,
    t.TeamDes
    from admin_user_team as ut
    inner join admin_user as u
    on ut.username = u.username
    inner join tb_team_info as t
    on ut.teamID = t.id
  `
  let data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return {
    rows: data
  };
};

/**
 * 生态人员添加
 */
exports.insideStaffSave = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const isExist = await Admin_user.findOne({where: {username: params.username}});
  if (isExist) {
    throw new Error('AlreadyExist');
  }
  const docForWallet = {
    username: params.username,
    adminname: params.idname,
    password: util_encrypt.AHMD5(params.password),
    idname: params.idname,
    phone: params.phone,
    email: params.email
  };
  const ret = await Admin_user.create(docForWallet);
  return ret
};

/**
 * 俱乐部人员新增
 */
exports.culbStaffSave = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const Admin_user_team = DB.getModel('admin_user_team');
  // const Admin_Info = DB.getModel('tb_admin_info');
  // const ai = await Admin_Info.findOne({where: {sUnionid: username}});
  // if (!ai) {
  //   throw new Error('user not exist');
  // };
  const isExist = await Admin_user.findOne({where: {username: params.username}});
  if (isExist) {
    throw new Error('该人已经存在！');
  };
  const obj = {
    username: params.username,
    adminname: params.idname,
    password: util_encrypt.AHMD5(params.password),
    idname: params.idname,
    phone: params.phone,
    email: params.email
  };
  const ret = await Admin_user.create(obj);
  const doc = {
    teamID: params.teamID,
    username: params.username,
    createdAt: moment(new Date()),
    TeamGroup: params.TeamGroup
  };
  const r = await Admin_user_team.create(doc);
  return ret
};

/**
 * 俱乐部人员修改
 */
exports.culbStaffUpdate = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_userRole = DB.getModel('admin_userRole');
  const ret = await Admin_userRole.bulkCreate(params);
  return ret
};

/**
 * 俱乐部人员角色删除 admin_userRole
 */
exports.delUserRole = async(server, userId) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_userRole = DB.getModel('admin_userRole');
  const ret = await Admin_userRole.destroy({ where: { userId } });
  return ret
};

/**
 * admin_userRole
 */
exports.userRoleSave = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_userRole = DB.getModel('admin_userRole');
  const adminUserTeam = await Admin_userRole.bulkCreate(params);
  return adminUserTeam;
};

/**
 * 生态人员修改
 */
exports.insideStaffUpdate = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const ret = await Admin_user.update({ lastLoginAt: new Date() }, { where: params });
  return ret
};

exports.insideStaffDel = async(server, username) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const ret = await Admin_user.destroy({ where: { username } });
  return ret
};

/**
 * 俱乐部人员角色删除 admin_userRole
 */
exports.delUser = async(server, username) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_user = DB.getModel('admin_user');
  const ret = await Admin_user.destroy({ where: { username } });
  return ret
};



