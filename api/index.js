const Joi = require('joi');
const api_action = require('./handlers/api_action');
const api_base = require('./handlers/api_base');
const service_admin_interface = require('../service/admin_interface');

exports.register = (server, options, next) => {

  const routes = [
    // admin_user
    {method: 'POST', path: '/api/login', config: api_base.login},
    {method: 'POST', path: '/api/updateUserInfo', config: api_base.update_user_info},
    {method: 'GET', path: '/api/getAllTeams', config: api_base.team_all},
    {method: 'GET', path: '/api/getTeamsBySeasonId', config: api_base.team_by_season},
    {method: 'GET', path: '/api/getTeamDetail', config: api_base.team_detail},
    {method: 'GET', path: '/api/getAllseasons', config: api_base.season_all},
    {method: 'POST', path: '/api/searchMatch', config: api_base.search_match},
    {method: 'GET', path: '/api/getMatchDetail', config: api_base.match_detail},
    {method: 'GET', path: '/api/getAllPlayers', config: api_base.player_all},
    {method: 'GET', path: '/api/getAllCoaches', config: api_base.coach_all},
    {method: 'GET', path: '/api/getMatchDates', config: api_base.match_date},
    {method: 'POST', path: '/api/applyAdmin', config: api_base.admin_apply},
    {method: 'GET', path: '/api/getApplyAdminStatus', config: api_base.admin_apply_status},
    {method: 'POST', path: '/api/updateFirst', config: api_action.update_first},
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
  name: 'api interface'
};
