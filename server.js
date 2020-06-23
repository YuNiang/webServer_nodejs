'use strict';
const Hapi = require('hapi');
const Sequelize = require('sequelize');
const Boom = require('boom');
const Dotenv = require('dotenv');
Dotenv.config({silent: true, path: '.env'});

const config = require('./config/config');
const configErrorMsg = require('./config/errorMsg');

const jwtPlugin = require('hapi-auth-jwt2');
const hapiSequelizePlugin = require('hapi-sequelize');
const inertPlugin = require('inert');
const visionPlugin = require('vision');
const hapiSwaggerPlugin = require('hapi-swagger');
const authPlugin = require('./auth');
const adminPlugin = require('./admin/index');
const apiPlugin = require('./api/index');
const loggerPlugin = require('./plugins/logger');

/**
 * start server
 */
exports.start = () => {

  const sqlconn = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port:process.env.DB_PORT,
      timezone: '+08:00',
      dialect: 'mysql',
      dialectOptions: {
        encrypt: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
      define: {
        timestamps: false
      },
      pool: {
        max: 100,
        min: 0,
        idle: 10000
      },
      logging: function (sql) {
        // console.log(sql);
      }
    }
  );
  global.Sequelize = sqlconn;

  const server = new Hapi.Server();

  server.connection({
    port: 9800,
    host: '0.0.0.0',
    routes: {
      cors: {
        additionalHeaders: ['Content-Language', 'Cache-Control', 'Version']
      },
      state: {
        parse: true,
        failAction: 'ignore'
      }
    },
    router: {
      stripTrailingSlash: true
    }
  });

  // register plugin
  return server.register([
    loggerPlugin,
    jwtPlugin,
    inertPlugin,
    authPlugin,
    {
      register: hapiSequelizePlugin,
      options: [{
        name: process.env.DB_DBNAME,
        models: ['./models/*.js'],  // paths/globs to model files
        sequelize: sqlconn,
        sync: false,
        forceSync: false
      }]
    },
    visionPlugin,
    {
      register: hapiSwaggerPlugin,
      options: {
        info: {
          title: 'API Documentation',
          description: 'API Documentation'
        },
        // pathPrefixSize: 2,
        documentationPath: '/docs/account/documentation',
        swaggerUIPath: '/docs/account/swaggerui/',
        jsonPath: '/docs/account/swagger.json',
        securityDefinitions: {
          jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      }
    },
    {
      register: adminPlugin,
      routes: {
        prefix: '/admin'
      }
    },
    {
      register: apiPlugin,
      routes: {
        prefix: '/api'
      }
    },
  ]).then(() => {

    // start server
    return server.start();
  }).then(() => {

    // static resource
    this.staticResource(server);

    // admin logs
    this.adminLogs(server);

    // format model
    this.formatModel(server);

    // error msg
    this.errorMsg(server);

    return server;
  });
};

/**
 * static resource
 * @param server
 */
exports.staticResource = server => {

  server.route({
    method: 'GET',
    path: '/static/{params*}',
    handler: {
      directory: {
        path: 'static'
      }
    }
  });
};

/**
 *
 * @param server
 */
exports.adminLogs = server => {

  const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
  const Admin_userOperationLog = DB.getModel('admin_userOperationLog');

  server.ext({
    type: 'onPreHandler',
    method: function (request, reply) {
      reply.continue();
      if (/^\/admin\/.*/.test(request.path)) {
        const session = request.auth.credentials;
        if (session) Admin_userOperationLog.create({
          username: session.username,
          api: request.path,
          method: request.method,
          query: request.method == 'get' ? JSON.stringify(request.query) : '',
          payload: request.method == 'post' ? JSON.stringify(request.payload) : ''
        });
      }
    }
  });
};

/**
 *
 * @param server
 */
exports.formatModel = server => {

  server.ext({
    type: 'onPostHandler',
    method: function (request, reply) {
      if (request.response.source && request.response.source.dataValues) request.response.source = request.response.source.dataValues;
      reply.continue();
    }
  });
};

/**
 *
 * @param server
 */
exports.errorMsg = server => {

  server.ext({
    type: 'onPreResponse',
    method: function (request, reply) {
      // check response type
      if (!request.response.isBoom) return reply.continue();
      // get raw message and params string
      const [rawMessage, paramsStr] = request.response.output.payload.message.split('|');
      // check message whether configured
      if (!configErrorMsg.msg[rawMessage]) return reply.continue();
      // get language
      const language = request.headers['content-language'] ? request.headers['content-language'] : config.language.default;
      // get template
      const template = configErrorMsg.msg[rawMessage][language] ? configErrorMsg.msg[rawMessage][language] : rawMessage;
      // render message
      let message = template;
      let counter = 0;
      if (paramsStr) {
        const params = paramsStr.split(',');
        message = template.replace(/(#)/g, () => params[counter++]);
      }
      // update message
      request.response.output.payload.message = message;
      reply.continue();
    }
  });
};

// start server
this.start();
