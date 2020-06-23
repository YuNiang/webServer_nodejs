
exports.query = async (server, criteria, page, pageSize, order = [], attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');

  return TB_player_info_action.findAndCountAll({
    attributes,
    raw: true,
    where: criteria,
    order,
    offset: --page * pageSize,
    limit: pageSize
  });
};

exports.queryAll = async (server, TeamID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');
  const TB_player_info = DB.getModel('tb_player_info');

  const obj = {
    newTeamID: TeamID,
    Step: 1,
    iType: '130'
  }
  const ret = await TB_player_info_action.findAndCountAll({
    attributes: ['*'],
    raw: true,
    where: obj,
  });
  let teamIds = [];
  ret && ret.rows && ret.rows.length && ret.rows.forEach(item => {
    if (item.PlayerID) {
      teamIds.push(item.PlayerID);
    }
  })
  if(teamIds.length == 0) {
    return [];
  }
  let criteria = {};
  if (teamIds.length) {
    criteria.id = { $in: teamIds }
  }
  const data = await TB_player_info.findAndCountAll({
    attributes: ['*'],
    raw: true,
    where: criteria
  });
  return data;
};

exports.queryOne = async (server, PlayerID, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');
  const criteria = {
    id: PlayerID
  };

  const ret = await TB_player_info_action.findOne({
    attributes,
    raw: true,
    where: criteria
  });
  return ret;
};

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');
  const ret = await TB_player_info_action.create(params);
  return ret;
};

exports.updateStep = async (server, PlayerID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');
  const ret = await TB_player_info_action.update({ Step: 2 }, { where: {
    PlayerID: PlayerID,
    Step: 1
  }});
  return ret;
};

