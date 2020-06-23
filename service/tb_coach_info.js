const moment = require('moment');
const service_ec_team_info = require('./ec_team_info');

exports.query = async (server, criteria, page, pageSize) => {
  let sql = 'select a.* '+
  ' from tb_coach_info as a ' +
  ' where a. AuditStatus = 1 and IsDelete = 1 ';
  let p =[];
  if (criteria.NameCn) {
    p.push('a.sName = "' + criteria.NameCn + '"');
  }
  if (criteria.TeamID) {
    p.push('a.iTeamId = "' + criteria.TeamID + '"');
  }
  if (criteria.TeamGroup) {
    p.push('a.TeamGroup = "' + criteria.TeamGroup + '"');
  }
  if (criteria.Passport) {
    p.push('a.Passport = ' + criteria.Passport);
  }
  if (criteria.IDNumber) {
    p.push('a.IDNumber = ' + criteria.IDNumber);
  }
  p.push('date_add(str_to_date(a.ContractEndedAt,"%Y-%m-%d"), interval 3 day) >= "' + moment().format('YYYY-MM-DD') +'"');
  if (p.length > 0) {
    sql += ' and  ' + p.join(' and ');
  }
  let countSql = ' select count(*) as num from ( ' + sql + ' ) as a ';
  let count = await global.Sequelize.query(countSql, { type: global.Sequelize.QueryTypes.SELECT });
  sql += ' limit ' + (--page*pageSize) + ',' + pageSize;
  let data = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  const teamInfo = await service_ec_team_info.query();
  data && data.length &&
  data.forEach(d => {
    teamInfo.forEach(t => {
      if (d.iTeamId == t.id) {
        d.TeamDes = t.TeamDes;
        if (d.TeamGroup == '1') {
          d.TeamGroupName = t;
        } else if(d.TeamGroup == '2') {
          d.TeamGroupName = t;
        }
      }
    });
  });
  return {
    rows: data,
    count: count[0].num
  };
};

exports.queryOne = (server, CoachID, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_coach_info');

  const criteria = {
    id: CoachID
  };

  return TB_coach_info.findOne({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_coach_info');
  const TB_coach_info_file = DB.getModel('tb_coach_info_file');
  const { IDNumber, Passport } = params;
  const criteria = {
    $or: [{ IDNumber }, { Passport }]
  };
  const [model, created] = await TB_coach_info.findOrCreate({ where: criteria, defaults: params});
  if (created && params.fileData && params.fileData.length) {
    params.fileData.forEach(f => {
      f.CoachID = model.id;
    });
    await TB_coach_info_file.bulkCreate(params.fileData);
  }
  if (!created) {throw new Error('already exist');}
  return model;
};

exports.delInfo = async (server, id ) => {
  const sql = `update tb_coach_info set isDelete = -1 where id = ${id} `;
  await global.Sequelize.query(sql);
  return true;
};

exports.queryTeamCount = async(server, TeamID) => {
  const sql = 
    `select count(*) as num from tb_coach_info 
    where iTeamId = ${TeamID} and IsDelete = 1 and AuditStatus = 1
    `;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret[0].num || 0;
};

/**
 * 审核通过后，调用改接口修改选手审核状态
 */
exports.auditInfo = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_coach_info');
  const ret = await TB_coach_info.update(params, { where: { id: params.id }});
  return ret;
};

exports.updateInfo = async (server, id, params ) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_coach_info');
  const TB_coach_info_file = DB.getModel('tb_coach_info_file');
  params.iType = 9;
  await TB_coach_info.update(params, { where: {id}});
  if (params.fileData && params.fileData.length) {
    for (let f in params.fileData) {
      let file = await TB_coach_info_file.findOne({
        attributes:['*'], raw: true,
        where: {
          CoachID: id,
          TemplateID: params.fileData[f].TemplateID
        }
      });
      const updatefile = {
        CoachID: id,
        TemplateID: params.fileData[f].TemplateID,
        ExtValue: params.fileData[f].ExtValue,
        ExpireAt: params.fileData[f].ExpireAt,
      };
      if (file) {
        await TB_coach_info_file.update(updatefile, { where: {
          CoachID: id,
          TemplateID: params.fileData[f].TemplateID
        }});
      } else {
        await TB_coach_info_file.create(updatefile);
      }
    }
  }
  return id;
};

exports.queryOneWithFile = async (server, CoachID, teamID, teamGroup, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info = DB.getModel('tb_coach_info');
  let ret = await TB_coach_info.findOne({
    attributes,
    raw: true,
    where: {
      id: CoachID
    }
  });
  const sql = 
  `select p.*,f.sName, f.sDemoFilePath from tb_coach_info_file as p
  left join FileTemplate as f
  on p.TemplateID = f.id
  where p.CoachID = ${CoachID} `;
  const file = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  ret.fileData = file;
  if (!ret.iTeamId) {
    ret.iTeamId = teamID;
  }
  if (!ret.TeamGroup) {
    ret.TeamGroup = teamGroup;
  }
  let team = {};
  const teamInfo = await service_ec_team_info.query();
  teamInfo.forEach(t => {
    if (ret.iTeamId == t.id) {
      team.TeamDes = t.TeamDes;
      if (ret.TeamGroup == '1') {
        team.TeamGroup = '1';
        team.TeamGroupName = t.TeamDes;
      } else if(ret.TeamGroup == '2') {
        team.TeamGroup = '2';
        team.TeamGroupName = t.TeamDes;
      }
    }
  });
  ret.teamInfo = team;
  return ret;
};

exports.saveFile = async(server, list) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info_file = DB.getModel('tb_coach_info_file');
  const ret  = TB_coach_info_file.bulkCreate(list);
  return ret;
};

exports.updateFile = async (server, CoachID, TemplateID, ExtValue, ExpireAt ) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_coach_info_file = DB.getModel('tb_coach_info_file');
  let criteria = {};
  if(ExtValue){ criteria.ExtValue = ExtValue;}
  if(ExpireAt){ criteria.ExpireAt = ExpireAt;}
  return TB_coach_info_file.update(criteria , { where: { CoachID, TemplateID }});
};



