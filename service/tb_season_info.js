'use strict';

exports.getTeamInfo = async (server,teamId) => {
	const DBPL = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
	const TeamInfo = DBPL.getModel('tb_team_info');
	return TeamInfo.findOne({where: { id:teamId },raw: true }).then(data => { return data });
};

/**
 * LPL赛季和LDL赛季到常规赛时间
 */
exports.getMatchTime = async (server) => {
	const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_season_info_ext = DB.getModel('tb_season_info_ext');
  const ret = await TB_season_info_ext.findAll({
    raw: true
  });
	let retData = {};
	ret.forEach(e => {
		retData[e.extKey] = e.extValue;
  });
  return retData;
};

exports.queryExt = async (server, page, pageSize, order = [], attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_season_info_ext');

  const data = await TB_coach_info.findAll({
    attributes,
    raw: true,
    order,
    offset: --page * pageSize,
    limit: pageSize
  });
  return data;
};

