const Joi = require('joi');
const auth_route = require('./handlers/auth_route');
const auth_role = require('./handlers/auth_role');
const auth_role_route = require('./handlers/auth_role_route');
const auth_user = require('./handlers/auth_user');
const auth_user_role = require('./handlers/auth_user_role');
const auth_app = require('./handlers/auth_app');
const auth_app_role = require('./handlers/auth_app_role');
const service_admin_interface = require('../service/admin_interface');
const admin_user = require('./handlers/admin_user');
const admin_interface = require('./handlers/admin_interface');
const admin_role = require('./handlers/admin_role');
const admin_userRole = require('./handlers/admin_userRole');
const admin_route = require('./handlers/admin_route');
const admin_roleRoute = require('./handlers/admin_roleRoute');
const first_manage = require('./handlers/first_manage');
const tb_admin_info = require('./handlers/tb_admin_info');
const tb_team_info = require('./handlers/tb_team_info');
const tb_player_info = require('./handlers/tb_player_info');
const tb_coach_info = require('./handlers/tb_coach_info');
const file_template = require('./handlers/file_template');
const audit_order = require('./handlers/audit_order');
const ec_team_info = require('./handlers/ec_team_info');
const tb_player_info_action = require('./handlers/tb_player_info_action');
const tb_season_info_ext = require('./handlers/tb_season_info_ext');
const oper_log = require('./handlers/oper_log');
const file = require('./handlers/file');
const eco_user = require('./handlers/eco_user');
const game_rel_manage = require('./handlers/game_rel_manage');
const wonderful_match = require('./handlers/wonderful_match');

exports.register = (server, options, next) => {
  const routes = [
    // auth_route
    {method: 'GET', path: '/auth_route/id', config: auth_route.queryById},
    {method: 'GET', path: '/auth_route/service', config: auth_route.queryByService},
    {method: 'GET', path: '/auth_route/distinct', config: auth_route.distinct},
    {method: 'POST', path: '/auth_route/delete', config: auth_route.delete},
    {method: 'POST', path: '/auth_route', config: auth_route.save},
    {method: 'POST', path: '/auth_route/edit', config: auth_route.update},
    // auth_role
    {method: 'GET', path: '/auth_role', config: auth_role.query},
    {method: 'GET', path: '/auth_role/id', config: auth_role.queryById},
    {method: 'POST', path: '/auth_role/delete', config: auth_role.delete},
    {method: 'GET', path: '/auth_role/all', config: auth_role.queryAll},
    {method: 'POST', path: '/auth_role', config: auth_role.save},
    {method: 'POST', path: '/auth_role/edit', config: auth_role.update},
    // auth_role_route
    {method: 'GET', path: '/auth_role_route', config: auth_role_route.query},
    {method: 'POST', path: '/auth_role_route/bulk', config: auth_role_route.bulkSaveUpdate},
    // auth_user
    {method: 'POST', path: '/auth_user/login', config: auth_user.login},
    {method: 'GET', path: '/auth_user', config: auth_user.query},
    {method: 'GET', path: '/auth_user/id', config: auth_user.queryById},
    {method: 'POST', path: '/auth_user/delete', config: auth_user.delete},
    {method: 'POST', path: '/auth_user', config: auth_user.save},
    {method: 'POST', path: '/auth_user/edit', config: auth_user.update},
    // auth_user_role
    {method: 'GET', path: '/auth_user_role', config: auth_user_role.query},
    {method: 'POST', path: '/auth_user_role/bulk', config: auth_user_role.bulkSaveUpdate},
    // auth_app
    {method: 'GET', path: '/auth_app', config: auth_app.query},
    {method: 'GET', path: '/auth_app/id', config: auth_app.queryById},
    {method: 'POST', path: '/auth_app/delete', config: auth_app.delete},
    {method: 'POST', path: '/auth_app', config: auth_app.save},
    {method: 'POST', path: '/auth_app/edit', config: auth_app.update},
    // auth_app_role
    {method: 'GET', path: '/auth_app_role', config: auth_app_role.query},
    {method: 'POST', path: '/auth_app_role/bulk', config: auth_app_role.bulkSaveUpdate},
    // admin_user
    {method: 'POST', path: '/admin_user/login', config: admin_user.login},
    {method: 'POST', path: '/admin_user/register', config: admin_user.register},
    {method: 'POST', path: '/admin_user/updatePassword', config: admin_user.updatePassword},
    {method: 'GET', path: '/admin_user', config: admin_user.query},
    {method: 'GET', path: '/admin_user/queryCoach', config: admin_user.query_coach},
    { method: 'GET', path: '/admin_user/queryInsideList', config: admin_user.queryInsideList },
    { method: 'GET', path: '/admin_user/queryInsideById', config: admin_user.queryInsideById },
    { method: 'POST', path: '/admin_user/insideStaffSave', config: admin_user.insideStaffSave },
    { method: 'POST', path: '/admin_user/insideStaffUpdate', config: admin_user.insideStaffUpdate },
    { method: 'POST', path: '/admin_user/insideStaffDel', config: admin_user.insideStaffDel },
    { method: 'GET', path: '/admin_user/queryCulbList', config: admin_user.queryCulbList },
    { method: 'GET', path: '/admin_user/queryCulbById', config: admin_user.queryCulbById },
    { method: 'POST', path: '/admin_user/culbStaffSave', config: admin_user.culbStaffSave },
    { method: 'POST', path: '/admin_user/culbStaffUpdate', config: admin_user.culbStaffUpdate },
    { method: 'POST', path: '/admin_user/culbStaffDel', config: admin_user.culbStaffDel },
    { method: 'GET', path: '/admin_user/queryLoginUserTeam', config: admin_user.queryLoginUserTeam },

    {method: 'GET', path: '/admin_user/me', config: admin_user.queryForCurrentUser},
    {method: 'GET', path: '/admin_user/me/route', config: admin_user.queryRouteForCurrentUser},
    // admin_interface
    {method: 'GET', path: '/admin_interface', config: admin_interface.query},
    // admin_role
    {method: 'GET', path: '/admin_role', config: admin_role.query},
    {method: 'POST', path: '/admin_role', config: admin_role.save},
    {method: 'POST', path: '/admin_role/{id}', config: admin_role.update},
    {method: 'POST', path: '/admin_role/{id}/delete', config: admin_role.delete},
    // admin_userRole
    {method: 'GET', path: '/admin_userRole', config: admin_userRole.query},
    {method: 'POST', path: '/admin_userRole', config: admin_userRole.save},
    {method: 'POST', path: '/admin_userRole/{id}/delete', config: admin_userRole.delete},
    // admin_route
    {method: 'GET', path: '/admin_route', config: admin_route.query},
    {method: 'POST', path: '/admin_route', config: admin_route.save},
    {method: 'GET', path: '/admin_route/all', config: admin_route.queryAll},
    {method: 'POST', path: '/admin_route/{id}', config: admin_route.update},
    {method: 'POST', path: '/admin_route/{id}/delete', config: admin_route.delete},
    // admin_roleRoute
    {method: 'GET', path: '/admin_roleRoute', config: admin_roleRoute.query},
    {method: 'POST', path: '/admin_roleRoute', config: admin_roleRoute.save},
    {method: 'GET', path: '/admin_roleRoute/all', config: admin_roleRoute.queryAll},
    {method: 'POST', path: '/admin_roleRoute/bulk', config: admin_roleRoute.bulkSave},
    {method: 'POST', path: '/admin_roleRoute/{id}/delete', config: admin_roleRoute.delete},
    {method: 'POST', path: '/admin_roleRoute/{idStr}/bulkDelete', config: admin_roleRoute.bulkDelete},
    //首发管理
    {method: 'GET', path: '/getAllTeamBySeason', config: first_manage.team_all_by_season},
    {method: 'GET', path: '/getAllCity', config: first_manage.city_all},
    {method: 'GET', path: '/getTeamDetail', config: first_manage.team_detail},
    {method: 'GET', path: '/getAllSeason', config: first_manage.season_all},
    {method: 'POST', path: '/searchMatch', config: first_manage.search_match},
    {method: 'POST', path: '/searchMatchDetail', config: first_manage.search_match_detail},
    {method: 'GET', path: '/getMatchDetail', config: first_manage.match_detail},
    {method: 'GET', path: '/getPlayers', config: first_manage.player_all},
    {method: 'GET', path: '/getCoachs', config: first_manage.coach_all},
    {method: 'POST', path: '/updateFirst', config: first_manage.update_first},
    {method: 'POST', path: '/updateCoach', config: first_manage.update_coach},
    // tb_admin_info
    {method: 'GET', path: '/tb_admin_info', config: tb_admin_info.query},
    {method: 'POST', path: '/tb_admin_info/{id}/checkPass', config: tb_admin_info.checkPass},
    {method: 'POST', path: '/tb_admin_info/{id}/checkNotPass', config: tb_admin_info.checkNotPass},
    // tb_team_info
    {method: 'GET', path: '/tb_team_info', config: tb_team_info.query},
    {method: 'GET', path: '/tb_team_info/bulk', config: tb_team_info.queryBulk},
    // tb_player_info
    { method: 'GET', path: '/tb_player_info/query', config: tb_player_info.query },
    { method: 'GET', path: '/tb_player_info/queryExcel', config: tb_player_info.queryExcel },
    { method: 'GET', path: '/tb_player_info/queryById', config: tb_player_info.queryById },
    { method: 'POST', path: '/tb_player_info/save', config: tb_player_info.save },
    { method: 'POST', path: '/tb_player_info/update', config: tb_player_info.update },
    { method: 'GET', path: '/tb_player_info/filterPlayer', config: tb_player_info.filterPlayer },
    { method: 'POST', path: '/tb_player_info/saveBack', config: tb_player_info.saveBack },
    { method: 'POST', path: '/tb_player_info/saveBackByAdmin', config: tb_player_info.saveBackByAdmin},
    { method: 'POST', path: '/tb_player_info/saveUp', config: tb_player_info.saveUp },
    { method: 'POST', path: '/tb_player_info/saveDown', config: tb_player_info.saveDown },
    { method: 'POST', path: '/tb_player_info/saveBorrow', config: tb_player_info.saveBorrow },
    { method: 'POST', path: '/tb_player_info/saveTransfer', config: tb_player_info.saveTransfer },
    { method: 'POST', path: '/tb_player_info/saveRescission', config: tb_player_info.saveRescission },
    { method: 'GET', path: '/tb_player_info/queryTeamCount', config: tb_player_info.queryTeamCount },
    { method: 'GET', path: '/tb_player_info/queryOrderWithAllData', config: tb_player_info.queryOrderWithAllData },
    { method: 'GET', path: '/tb_player_info/queryTransferTime', config: tb_player_info.queryTransferTime },
    { method: 'GET', path: '/tb_player_info/querySkillPoint', config: tb_player_info.querySkillPoint },
    { method: 'POST', path: '/tb_player_info/saveEnd', config: tb_player_info.saveEnd },

    // tb_coach_info
    { method: 'GET', path: '/tb_coach_info/query', config: tb_coach_info.query },
    { method: 'GET', path: '/tb_coach_info/queryById', config: tb_coach_info.queryById },
    { method: 'POST', path: '/tb_coach_info/save', config: tb_coach_info.save },
    { method: 'POST', path: '/tb_coach_info/update', config: tb_coach_info.update },
    { method: 'POST', path: '/tb_coach_info/saveEnd', config: tb_player_info.saveEnd },
    // FileTemplate
    { method: 'GET', path: '/file_template', config: file_template.query },
    { method: 'GET', path: '/file_template/queryById', config: file_template.queryById },
    { method: 'POST', path: '/file_template/save', config: file_template.save },
    { method: 'POST', path: '/file_template/update', config: file_template.update },
    { method: 'POST', path: '/file_template/delete', config: file_template.delete },
    { method: 'POST', path: '/file_template/isStatus', config: file_template.isStatus },
    // Auditorder
   //{ method: 'GET', path: '/audit_order/query', config: audit_order.query },
    { method: 'GET', path: '/audit_order/queryById', config: audit_order.queryById },
    { method: 'POST', path: '/audit_order/audit', config: audit_order.audit },
    { method: 'GET', path: '/audit_order/uesrOrderList', config: audit_order.queryAuditHist },
    { method: 'POST', path: '/audit_order/adoptAfterSave', config: audit_order.adoptAfterSave },
    { method: 'GET', path: '/audit_order/queryAuditingByOuterId', config: audit_order.queryAuditingByOuterId },
    { method: 'POST', path: '/audit_order/updateOrder', config: audit_order.updateOrder },
    // tb_season_info_ext
    { method: 'GET', path: '/tb_season_info_ext/query', config: tb_season_info_ext.queryExt },
    { method: 'POST', path: '/tb_season_info_ext/saveMathConfigTime', config: tb_season_info_ext.saveMathConfigTime },
    // ec_team_info 生态俱乐部
    { method: 'GET', path: '/ec_team_info/query', config: ec_team_info.query },
    // tb_player_info_action 转会动作
    { method: 'GET', path: '/tb_player_info_action/query', config: tb_player_info_action.query },
    // OperLog
    { method: 'GET', path: '/oper_log/query', config: oper_log.query },
    // eco_user
    { method: 'GET', path: '/queryUserByRoleID', config: eco_user.queryUserByRoleID },
    { method: 'GET', path: '/queryUserByID', config: eco_user.queryUserByID },
    { method: 'GET', path: '/queryUser', config: eco_user.queryUser },
    { method: 'POST', path: '/saveUser', config: eco_user.saveUser },
    { method: 'POST', path: '/updateUser', config: eco_user.updateUser },
    { method: 'POST', path: '/deleteUser', config: eco_user.deleteUser },
    { method: 'GET', path: '/queryEcoUser', config: eco_user.queryEcoUser },
    { method: 'GET', path: '/queryEcoRole', config: eco_user.queryEcoRole },

    // file
    { method: 'POST', path: '/file/upload', config: file.upload },
    { method: 'POST', path: '/file/generationURL', config: file.generationURL },
    //对局管理
    {method: 'POST', path: '/match_live/get_all_online_games', config: game_rel_manage.get_all_online_games},
    {method: 'POST', path: '/match_live/get_matchs_by_season_and_date', config: game_rel_manage.get_matchs_by_season_and_date},
    {method: 'POST', path: '/match_live/modify_game_rel', config: game_rel_manage.modify_game_rel},
    {method: 'POST', path: '/match_live/valid_game_rel', config: game_rel_manage.valid_game_rel},
    // 赛老师集锦管理
    { method: 'GET', path: '/wonderful_match/query', config: wonderful_match.query },
    { method: 'GET', path: '/wonderful_match/querySeason', config: wonderful_match.querySeason },
    { method: 'GET', path: '/wonderful_match/queryMatchs', config: wonderful_match.queryMatchs },
    { method: 'POST', path: '/wonderful_match/saveCloudService', config: wonderful_match.saveCloudService },
    { method: 'GET', path: '/wonderful_match/queryAll', config: wonderful_match.queryAll },
  ];

  // add Authorization to swagger
  routes.forEach(item => {
    if (item.config.auth == 'jwt') {
      if (!item.config.validate) item.config.validate = {};
      item.config.validate.headers = Joi.object({
        authorization: Joi.string().required()
      }).unknown();
    }
    if (!item.config.tags) item.config.tags = ['api'];
    if (item.config.response) item.config.response.sample = 0;
  });

  server.route(routes);

  // register routes
  const array_route = routes.map(({method, path}) => ({method, path: `/admin${path}`}));
  server.app.route_admin = array_route;
  service_admin_interface.register(server, array_route);

  next();
};

exports.register.attributes = {
  name: 'api admin'
};
