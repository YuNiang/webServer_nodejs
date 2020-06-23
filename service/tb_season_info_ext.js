exports.saveMathConfigTime = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Tb_season_info_ext = DB.getModel('tb_season_info_ext');
  for (let item in params) {
    await Tb_season_info_ext.update({ extValue: params[item] }, { where: { extKey: item }});
  }
  return true;
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

