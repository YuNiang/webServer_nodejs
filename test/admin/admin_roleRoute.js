const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_roleRoute', function () {

  this.timeout(60000);

  let server;
  let Admin_role;
  let Admin_route;
  let Admin_roleRoute;
  let role;
  let route;
  let route1;
  let route2;

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_role = DB.getModel('admin_role');
      Admin_route = DB.getModel('admin_route');
      Admin_roleRoute = DB.getModel('admin_roleRoute');

      return Promise.all([
        Admin_role.destroy({where: {}, force: true}),
        Admin_route.destroy({where: {}, force: true}),
        Admin_roleRoute.destroy({where: {}, force: true}),
      ]);
    }).then(() => {

      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#save()', function () {


    it('should return object when parameters provided', done => {

      // create role
      request({
        url: 'http://localhost:9800/admin/admin_role',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: 'proxy',
          remark: 'ico proxy'
        },
        json: true
      }).then(data => {
        role = data;

        // create route
        return request({
          url: 'http://localhost:9800/admin/admin_route',
          method: 'POST',
          headers: {Authorization},
          body: {
            name: 'proxy',
            route: '/ico/proxy',
            remark: 'ico proxy',
            interfaces: [
              {method: 'GET', path: '/admin/admin_role'},
              {method: 'POST', path: '/admin/admin_role'},
              {method: 'POST', path: '/admin/admin_role/{id}'},
              {method: 'POST', path: '/admin/admin_role/{id}/delete'},
            ]
          },
          json: true
        });
      }).then(data => {
        route = data;

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
        data.should.be.type('object');
        data.should.have.property('roleId', role.id);
        done();
      });
    });


    it('should return error when roleRoute exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_roleRoute',
        method: 'POST',
        headers: {Authorization},
        body: {
          roleId: role.id,
          routeId: route.id,
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already added');
        done();
      });
    });


    it('should return error when role does not exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_roleRoute',
        method: 'POST',
        headers: {Authorization},
        body: {
          roleId: 0,
          routeId: route.id,
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('role does not exist');
        done();
      });
    });


    it('should return error when route does not exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_roleRoute',
        method: 'POST',
        headers: {Authorization},
        body: {
          roleId: role.id,
          routeId: 0
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('route does not exist');
        done();
      });
    });

  });

  describe('#bulkSave()', function () {


    it('should return object when parameters provided', done => {

      // create route1
      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: 'proxy1',
          route: '/ico/proxy1',
          remark: 'ico proxy1',
          interfaces: [
            {method: 'GET', path: '/admin/admin_role'},
            {method: 'POST', path: '/admin/admin_role'},
            {method: 'POST', path: '/admin/admin_role/{id}'},
            {method: 'POST', path: '/admin/admin_role/{id}/delete'},
          ]
        },
        json: true
      }).then(data => {
        route1 = data;

        // create route2
        return request({
          url: 'http://localhost:9800/admin/admin_route',
          method: 'POST',
          headers: {Authorization},
          body: {
            name: 'proxy2',
            route: '/ico/proxy2',
            remark: 'ico proxy2',
            interfaces: [
              {method: 'GET', path: '/admin/admin_role'},
              {method: 'POST', path: '/admin/admin_role'},
              {method: 'POST', path: '/admin/admin_role/{id}'},
              {method: 'POST', path: '/admin/admin_role/{id}/delete'},
            ]
          },
          json: true
        }).then(data => {
          route2 = data;

          // bulk create
          return request({
            url: 'http://localhost:9800/admin/admin_roleRoute/bulk',
            method: 'POST',
            headers: {Authorization},
            body: {
              roleId: role.id,
              routeIds: [route1.id, route2.id],
            },
            json: true
          });
        }).then(data => {
          data.should.be.type('object');
          done();
        });
      });

    });


    it('should return error when some roleRoute exist', done => {

      // bulk create
      request({
        url: 'http://localhost:9800/admin/admin_roleRoute/bulk',
        method: 'POST',
        headers: {Authorization},
        body: {
          roleId: role.id,
          routeIds: [route1.id, route2.id],
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already added some of them');
        done();
      });
    });

  });


  describe('#query()', function () {


    it('should return object when params provied', done => {

      request({
        url: 'http://localhost:9800/admin/admin_roleRoute',
        method: 'GET',
        headers: {Authorization},
        qs: {
          page: 1,
          size: 10,
          roleIdStr: role.id
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('count');
        data.should.have.property('rows');
        data.rows[0].should.have.property('route');
        done();
      });
    });

  });

  describe('#delete()', function () {


    it('should return 1 when params provided', done => {

      Admin_roleRoute.findOne({where: {roleId: role.id}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_roleRoute/${id}/delete`,
          method: 'POST',
          headers: {Authorization},
          json: true
        });
      }).then(data => {
        data.should.be.equal(1);
        done();
      });
    });


    it('should return error when role route does not exist', done => {

      request({
        url: `http://localhost:9800/admin/admin_roleRoute/000/delete`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('role route does not exist');
        done();
      });
    });

  });

  describe('#bulkDelete()', function () {


    it('should return number when params provided', done => {

      const ids = [];

      Admin_roleRoute.findAll({where: {roleId: role.id}}).then(data => {

        data.forEach(item => ids.push(item.id));

        return request({
          url: `http://localhost:9800/admin/admin_roleRoute/${ids.join(',')}/bulkDelete`,
          method: 'POST',
          headers: {Authorization},
          json: true
        });
      }).then(data => {
        data.should.be.equal(ids.length);
        done();
      });
    });


    it('should return error when some role route does not exist', done => {

      request({
        url: `http://localhost:9800/admin/admin_roleRoute/000,111,222/bulkDelete`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('some role route does not exist');
        done();
      });
    });

  });
});
