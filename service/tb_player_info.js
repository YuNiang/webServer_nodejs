const moment = require('moment');
const service_ec_team_info = require('./ec_team_info');
const service_audit_order = require('./audit_order');

exports.query = async (server, criteria, page, pageSize) => {
  let sql = 'select a.*,ac.iType '+
  ' from tb_player_info as a '+
  ' left join ' +
  '( '+
  '  SELECT PlayerID,iType 	'+
  '  from	tb_player_info_action  '+
  '  where iType = "180" and IsDelete = 1'+
  ') ac '+
  ' ON a.id = ac.PlayerID '+
  ' where AuditStatus = 1 and IsDelete = 1 ';
  let p = [];
  if (criteria.TeamID) {
    p.push('a.TeamID = "' + criteria.TeamID + '"');
  }
  if (criteria.NameCn) {
    p.push('a.NameCn = "' + criteria.NameCn + '"');
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
  return {
    rows: data,
    count: count[0].num
  };
};

exports.queryOne = async (server, PlayerID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  return await TB_player_info.findOne({where: {id: PlayerID},raw: true});
};

exports.queryOneWithFile = async (server, PlayerID, teamID, teamGroup, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');

  let ret = await TB_player_info.findOne({attributes, raw: true, where: {id: PlayerID}});
  const sql = `select p.*,f.sName, f.sDemoFilePath from tb_player_info_file as p left join FileTemplate as f on p.TemplateID = f.id where p.PlayerID = ${PlayerID} `;
  const file = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  if (ret) {
    ret.fileData = file;
  }
  if (!ret.TeamID) {
    ret.TeamID = teamID;
  }
  if (!ret.TeamGroup) {
    ret.TeamGroup = teamGroup;
  }
  return ret;
};

exports.queryAll = async (server, criteria, attributes = ['*']) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');

  return TB_player_info.findAll({
    attributes,
    raw: true,
    where: criteria
  });
};

exports.save = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  const TB_player_info_file = DB.getModel('tb_player_info_file');

  const model = await TB_player_info.create(params);
  if (params.fileData && params.fileData.length) {
    params.fileData.forEach(f => {
      f.id = null;
      f.PlayerID = model.id;
    });
    await TB_player_info_file.bulkCreate(params.fileData);
  }
  return model;

};

exports.queryTeamPlayerCount = async(TeamID, TeamGroup) => {
  const sql =
    `select count(*) as num from tb_player_info 
    where TeamID = ${TeamID} and TeamGroup = ${TeamGroup} and ActionType = 0
    `;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret[0].num || 0;
};

exports.queryTeamCount = async(server, TeamID) => {
  const sql = `select count(*) as num from tb_player_info where TeamID = ${TeamID} and IsDelete = 1 and AuditStatus = 1`;
  const ret = await global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
  return ret[0].num || 0;
};

/**
 * delInfo
 * @returns {*}
 */
exports.delInfo = async (server, id ) => {
  const sql = `update tb_player_info set isDelete = -1 where id = ${id} `;
  await global.Sequelize.query(sql);
  return true;
};

exports.updateInfo = async (server, id, params ) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  const TB_player_info_file = DB.getModel('tb_player_info_file');
  await TB_player_info.update(params, { where: {id}});
  if (params.fileData && params.fileData.length) {
    for (let f in params.fileData) {
      let file = await TB_player_info_file.findOne({
        attributes:['*'], raw: true,
        where: {
          PlayerID: id,
          TemplateID: params.fileData[f].TemplateID
        }
      });
      const updatefile = {
        PlayerID: id,
        TemplateID: params.fileData[f].TemplateID,
        ExtValue: params.fileData[f].ExtValue,
        ExpireAt: params.fileData[f].ExpireAt,
      };
      if (file) {
        await TB_player_info_file.update(updatefile, { where: {
          PlayerID: id,
          TemplateID: params.fileData[f].TemplateID
        }});
      } else {
        await TB_player_info_file.create(updatefile);
      }
    }
  }
  return id;
};

/**
 * 审核通过后，调用改接口修改选手审核状态
 */
exports.auditInfo = async (server, params) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  try {
    const ret = await TB_player_info.update(params, { where: { id: params.id }});
    return ret;
  } catch(err) {}
  return null;
};

exports.filterPlayer = async(server, TeamID, iType) => {
  // 兼容 解约的时候，是查询教练表还是选手表  iType 教练是 160， 选手是 110
  let sql = '';
  if (iType === '160') {
    sql =
    `select id, sName as NameCn from tb_coach_info 
    where iTeamId = ${TeamID}
    `;
  } else {
    sql =
    `select id, NameCn from tb_player_info 
    where TeamID = ${TeamID}
    `;
  }
  return global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
};

exports.queryTeamAction = async (TeamID, iTypes)  =>  {
  const seasonTime = await global.Sequelize.query('select * from tb_season_info_ext', { type: global.Sequelize.QueryTypes.SELECT });
  let startTime = '';
  let endTime = '';
  seasonTime.forEach(ele => {
    if(ele.extKey == 'dtLdlRegularStart' || ele.extKey == 'dtLplRegularStart'){
      if(startTime == ''){
        startTime = ele.extValue;
      }else if(moment(startTime).isAfter(moment(ele.extValue))){
        startTime = ele.extValue;
      }
    }
    if(ele.extKey == 'dtLdlPlayoffEnd' || ele.extKey == 'dtLplPlayoffEnd'){
      if(endTime == ''){
        endTime = ele.extValue;
      }else if(moment(endTime).isBefore(moment(ele.extValue))){
        endTime = ele.extValue;
      }
    }
  });
  if (new Date(endTime).getTime() < Date.now()) {
    startTime = endTime = new Date();
  }
  const sql =
  `select * from tb_player_info_action 
  where (newTeamID = ${TeamID} or oldTeamID = ${TeamID})
  and iType in (${iTypes})
  and CreatedAt > '${startTime}' and CreatedAt < '${endTime}' and IsDelete = 1`;
  return global.Sequelize.query(sql, { type: global.Sequelize.QueryTypes.SELECT });
};

exports.delTeamAction = async (server, params)  =>  {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info_action = DB.getModel('tb_player_info_action');
  return TB_player_info_action.destroy({where: {
    PlayerID: params.PlayerID,
    iType: params.iType
  }});
};

exports.translateKey = () => {
  let params = {
    AcctXiagu: '峡谷之巅账号',
    KbType: '键盘型号',
    KbDriver: '键盘是否需要驱动',
    IsMouseDriven: '鼠标是否需要驱动',
    PlayerRole: '选手身份',
    NameCn: '姓名（中文）',
    NameEn: '姓名（英文）',
    Phone: '手机号',
    GameName: '游戏ID',
    PlayerPos: '选手位置',
    Birthday: '生日',
    Country: '国家地区',
    ContractStartedAt: '合同开始时间',
    ContractEndedAt: '合同结束时间',
    IDNumber: '身份证号码',
    AcctMatch: '比赛服账号',
    TrousersSize: '裤子尺寸',
    CoatSize: '外套尺寸',
    TshirtSize: 'T恤尺寸',
    ShoesSize: '鞋子尺码',
    Weight: '体重',
    Passport: '护照号码',
    VisaExpiredAt: '签证到期日',
    MouseType: '鼠标型号',
    AppearancePhoto: '定装照'
  };
  return params;
};

exports.checkClubPermission = async (server, playerID, teamID, actionType, orderID) => {
  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const TB_player_info = DB.getModel('tb_player_info');
  const TB_coach_info = DB.getModel('tb_coach_info');
  const TB_season_info_ext = DB.getModel('tb_season_info_ext');
  // check player and operator
  let doc = '';
  if (actionType === '160') {
    doc = await TB_coach_info.findOne({where: {id: playerID, iTeamId: teamID}});
  } else {
    doc = await TB_player_info.findOne({where: {id: playerID, TeamID: teamID}});
  }
  if (!doc) {throw new Error('权限不足');}
  // allow update
  if (orderID) {return;}
  // query transfer time
  const [transStart, transEnd] = await Promise.all([
    TB_season_info_ext.findOne({where: {extKey: 'dtTransferStart'}}),
    TB_season_info_ext.findOne({where: {extKey: 'dtTransferEnd'}}),
  ]);
  // not in transfer period
  if ((transStart && new Date(transStart.extValue).getTime() > Date.now()) || (transEnd && new Date(transEnd.extValue).getTime() < Date.now())) {
    // check skill point
    if (['120', '140', '180'].includes(actionType)) {
      const iType = ['120', '180'].includes(actionType) ? '120,180' : actionType;
      const count = await this.queryTeamAction(teamID, iType);
      if (count.length >= 3) {throw new Error('本赛季已经没有可用通道');}
    }
  } else { // in transfer period
    // block 180
    if (['180'].includes(actionType)) {throw new Error('转会期间不能借调选手');}
  }
  // check audit order
  if (!['170'].includes(actionType)) {
    const count = await service_audit_order.queryAuditingByOuterId(playerID, '100,110,120,130,140,170,180,190');
    if (count.length) {throw new Error('当前选手已存在未完成的工单，请完成后继续操作');}
  }
};
