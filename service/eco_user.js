const service_ec_team_info = require('./ec_team_info');

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_eco_user = DB.getModel('eco_user');
  try {
    const ret = await server_eco_user.create(params);
    return ret;
  } catch (error) {
    return false;
  }
};

exports.update = async(server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_eco_user = DB.getModel('eco_user');
  try {
    const criteria = {
      UserID: params.UserID,
    };
    await server_eco_user.destroy({ where: criteria });
    const ret = await server_eco_user.create(params);
    return ret;
  } catch (error) {
    return false;
  }
};

exports.delEcoUser = async(server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_eco_user = DB.getModel('eco_user');
  try {
    const criteria = {
      UserID: params.id,
    };
    const ret = await server_eco_user.destroy({ where: criteria });
    return ret;
  } catch (error) {
    return false;
  }
};

exports.queryAll = async (server, UserIDs) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_eco_user = DB.getModel('eco_user');
  let criteria = {
    UserID: UserIDs,
  };
  try {
    const data = await server_eco_user.findAll({
      attributes: ['*'],
      raw: true,
      where: criteria,
    });
    const teamInfo = await service_ec_team_info.query();
    data && data.length &&
    data.forEach(d => {
      teamInfo.forEach(t => {
        if(d.TeamID == t.id){
          d.TeamDes = t.TeamDes;
          if(d.TeamGroup == '1') {
            d.TeamGroupName = t.TeamDes;
          } else if(d.TeamGroup == '2') {
            d.TeamGroupName = t.TeamDes;
          }
        }
      });
    });
    return data;
  } catch (err) {
    console.log(err, 'err');
    throw err;
  }
};

exports.queryAllByTeam = async (server, TeamID, page, pageSize) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_eco_user = DB.getModel('eco_user');
  let params = {};
  if(TeamID){
    params.TeamID = TeamID;
  }
  const data = await server_eco_user.findAndCountAll({
    attributes: ['*'], raw: true,
    where: params,
    offset: --page * pageSize, limit: pageSize
  });
  return data;
};

exports.queryOne = async (server, UserID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const eco_user = DB.getModel('eco_user');
  let criteria = {
    UserID
  };

  const ret = await eco_user.findOne({
    attributes: ['*'],
    raw: true,
    where: criteria
  });
  return ret;
};

exports.queryUserTeam = async (server, UserID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Eco_user = DB.getModel('eco_user');
  const Team_info = DB.getModel('tb_team_info');
  // query eco user
  const eco_user = await Eco_user.findOne({where: {UserID}});
  if (!eco_user) return;
  // query team info
  const team_info = await Team_info.findOne({where: {id: eco_user.TeamID}});
  if (!team_info) return;
  const {id: TeamID, TeamDes, TeamLogo, LPL, LDL} = team_info;
  const TeamGroup = LPL || !LDL ? 2 : 1;
  return {TeamID, TeamDes, TeamLogo, TeamGroup};
};

exports.queryLoginUserTeam = async (server, teamID, teamGroup) => {
  try {
    const ret = await service_ec_team_info.query();
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
    throw error;
  }
};
