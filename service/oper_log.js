/**
 * save
 * @param server
 * @param params
 * @returns {*}
 */
exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const oper_Log = DB.getModel('OperLog');
  try {
    const ret = await oper_Log.create(params);
    return ret;
  } catch (error) {
    return false;
  }
};

exports.queryAll = async (server, page, pageSize, orderID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const OperLog = DB.getModel('OperLog');
  let criteria = {
    OrderID: orderID
  }
  return OperLog.findAndCountAll({
    attributes: ['*'],
    raw: true,
    where: criteria,
    order: [['id', 'DESC']],
    offset: --page * pageSize, limit: pageSize
  });
};


