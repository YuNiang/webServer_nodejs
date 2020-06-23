exports.query = async (criteria, page, pageSize) => {
  const skip = --page*pageSize;
  let sql = ` select * from FileTemplate where isDelete=1 `;
  if (criteria && criteria.iType) {
    sql = ` ${sql} and find_in_set(${criteria.iType}, iType) `;
  } 
  if (criteria && criteria.isActive) {
    sql = ` ${sql} and isActive=${isActive} `;
  } 
  let countSql = ' select count(*) as num from ( ' + sql + ' ) as a ';
  let count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });

  sql = ` ${sql} limit ${skip},${pageSize} `;
  let data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return {
    rows: data,
    count: count[0].num
  };
};


exports.delExt = async (server, PlayerID, Type) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');
  const criteria = {
    PlayerID,
    Type
  };
  return File_Template.destroy({ where: criteria });
};

exports.queryOne = async (server, id, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');
  const criteria = { id };
  return File_Template.findOne({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.queryAll = async (server, criteria, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');

  return File_Template.findAll({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');

  return File_Template.create(params);
};

exports.update = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');
  const { id } = params;

  return File_Template.update(params, { where: { id }});
};

exports.isStatus = async (server, id) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');

  return File_Template.update({isActive: -1}, { where: {id: id}});
};

exports.delete = async (server, id) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const File_Template = DB.getModel('FileTemplate');

  return File_Template.update({isDelete: -1}, { where: {id: id}});
};


