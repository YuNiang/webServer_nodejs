/**
 * query
 * @param server
 * @param criteria
 * @param page
 * @param pageSize
 * @param order
 * @param attributes
 * @returns {*}
 */
exports.query = (server, criteria, page = 1, pageSize = 10, order = [], attributes = ['*']) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_team_info = DB.getModel('tb_team_info');

  return TB_team_info.findAndCountAll({
    attributes: attributes,
    raw: true,
    where: criteria,
    order: order,
    offset: --page * pageSize,
    limit: pageSize
  });
};

/**
 * query all
 * @param server
 * @param criteria
 * @param attributes
 * @returns {*}
 */
exports.queryAll = (server, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_team_info = DB.getModel('tb_team_info');

  return TB_team_info.findAll({
    attributes: attributes,
    raw: true
  });
};

/**
 * query one
 * @param server
 * @param criteria
 * @param attributes
 * @returns {*}
 */
exports.queryOne = (server, criteria, attributes = ['*']) => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_team_info = DB.getModel('tb_team_info');

  return TB_team_info.findOne({
    attributes: attributes,
    raw: true,
    where: criteria
  });
};

exports.queryLPLTeamID = async (server, TeamID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_team_info = DB.getModel('tb_team_info');

  const data = await TB_team_info.findOne({
    raw: true,
    where: {id:TeamID}
  });
  if(!data){
    return 0;
  }
  return data.LPL;
};

exports.queryLDLTeamID = async (server, TeamID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_team_info = DB.getModel('tb_team_info');

  const data = await TB_team_info.findOne({
    raw: true,
    where: {id:TeamID}
  });
  if(!data){
    return 0;
  }
  return data.LDL;
};
