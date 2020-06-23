const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_user_auth', function () {

  this.timeout(60000);

  let server;
  let Admin_user;
  let Admin_role;
  let Admin_userRole;
  let Admin_route;
  let Admin_roleRoute;

  let user;
  let route;
  let role;
  let roleRoute;
  let userRole;

  let Authorization_admin;

  const username = 'admin';
  const password = '123456';

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_user = DB.getModel('admin_user');
      Admin_role = DB.getModel('admin_role');
      Admin_userRole = DB.getModel('admin_userRole');
      Admin_route = DB.getModel('admin_route');
      Admin_roleRoute = DB.getModel('admin_roleRoute');

      return Promise.all([
        Admin_user.destroy({where: {username}, force: true}),
        Admin_role.destroy({truncate: true, force: true}),
        Admin_userRole.destroy({truncate: true, force: true}),
        Admin_route.destroy({truncate: true, force: true}),
        Admin_roleRoute.destroy({truncate: true, force: true})
      ]);
    }).then(() => {

      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#create route role roleRoute userRole', function () {


    it('should return object', done => {

      // create route
      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: 'ico proxy',
          route: '/ico/proxy',
          remark: 'ico proxy',
          interfaces: server.app.route_admin
        },
        json: true
      }).then(data => {
        route = data;

        // create role
        return request({
          url: 'http://localhost:9800/admin/admin_role',
          method: 'POST',
          headers: {Authorization},
          body: {
            name: 'proxy',
            remark: 'ico proxy'
          },
          json: true
        });
      }).then(data => {
        role = data;

        // create roleRoute
        return request({
          url: 'http://localhost:9800/admin/admin_roleRoute',
          method: 'POST',
          headers: {Authorization},
          body: {
            roleId: role.id,
            routeId: route.id,
          },
          json: true
        });
      }).then(data => {
        roleRoute = data;

        // create user
        return request({
          url: 'http://localhost:9800/admin/admin_user/register',
          method: 'POST',
          headers: {Authorization},
          body: {
            username,
            password
          },
          json: true
        });
      }).then(data => {
        user = data;

        // create userRole
        return request({
          url: 'http://localhost:9800/admin/admin_userRole',
          method: 'POST',
          headers: {Authorization},
          body: {
            userId: user.id,
            roleId: role.id
          },
          json: true
        });
      }).then(data => {
        userRole = data;

        done();
      });
    });

  });


  describe('#login init permission', function () {


    it('should return object when username and password provided', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/login',
        method: 'POST',
        body: {
          username,
          password,
        },
        json: true
      }).then(data => {
        Authorization_admin = data.authorization;
        data.should.be.type('object');
        data.should.have.property('model');
        data.should.have.property('authorization');
        done();
      });
    });

  });


  describe('#test permission', function () {


    it('#/admin/admin_user/me/route', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/me/route',
        method: 'GET',
        headers: {Authorization: Authorization_admin},
        json: true
      }).then(data => {
        data.should.be.type('object');
        done();
      });
    });

    it('#/admin/account/{username}', done => {

      request({
        url: 'http://localhost:9800/admin/account/Jack',
        method: 'GET',
        headers: {Authorization: Authorization_admin},
        json: true
      }).then(data => {
        data.should.be.type('object');
        done();
      });
    });

  });

});
