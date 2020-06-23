'use strict';

exports.getTeamInfo = (server,teamId) => {
	const DBPL = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
	const TeamInfo = DBPL.getModel('tb_team_info');
	return TeamInfo.findOne({where: {id:teamId},raw:true}).then(data => {return data});
};


