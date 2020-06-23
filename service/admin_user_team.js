exports.queryOne = async (server, PlayerID, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  const criteria = {
    id: PlayerID
  };

  const ret = await TB_player_info.findOne({
    attributes,
    raw: true,
    where: criteria
  });
  return ret;
};

exports.queryOneWithFile = async (server, PlayerID, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  const TB_player_info_file = DB.getModel('tb_player_info_file');

  let ret = await TB_player_info.findOne({
    attributes,
    raw: true,
    where: {
      id: PlayerID
    }
  });
  const file = await TB_player_info_file.findAll({
    attributes,
    raw: true,
    where: {
      PlayerID
    }
  });
  ret.file = file;
  return ret;
};

exports.queryTeamPlayerCount = async(server, TeamID) => {
  const sql = 
    `select count(*) as num from tb_player_info 
    where TeamID = ${TeamID}
    `;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret[0].num || 0;
};

exports.delInfo = async (server, id) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  return TB_player_info.update({isDelete: -1}, { where: {id}});
};

exports.updateInfo = async (server, id, criteria) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  return TB_player_info.update(criteria, { where: {id}});
};

exports.getTeamGroupInfo = async (server, id, criteria) => {
  const sql = 
    `select count(*) as num from tb_player_info 
    where TeamID = ${TeamID}
    `;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret[0].num || 0;
};
