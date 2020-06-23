exports.saveBulkCreate = async (server, list) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');
  let data = [];
  list && list.length && 
  list.forEach(item => {
    data.push({
      keyPic: item.Key,
      platformGameID: item.platformGameID,
      matchID: item.matchID,
      BO: item.BO
    })
  })
  try {
    await server_wonderful_match.bulkCreate(data);
    return ret;
  } catch (error) {
    return false;
  }
};

exports.save = async(server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');
  try {
    await server_wonderful_match.create(params);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.update = async(server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');
  try {
    const criteria = {
      keyPic: params.keyPic
    };
    await server_wonderful_match.update(params, { where: criteria });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.queryOne = async (server, key, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');
  const criteria = {
    keyPic: key
  };
  try {
    const ret = await server_wonderful_match.findOne({
      attributes,
      raw: true,
      where: criteria
    });
    return ret;
  } catch (err) {
  }
};


exports.queryAll = async (server) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');
  const ret = await server_wonderful_match.findAll({
    attributes: ['*'],
    raw: true
  });
  return ret;
};


exports.queryByKeys = async (server, keys) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const server_wonderful_match = DB.getModel('wonderful_match');

  // const ret = await global.Sequelize.query(`select * from wonderful_match where keyPic in ( "${keys.join('","')}")`, { type: global.Sequelize.QueryTypes.SELECT });

  const ret = await server_wonderful_match.findAll({
    attributes: ['*'],
    raw: true,
    where: {keyPic : { $in: keys }}
  });
  return ret;
};
