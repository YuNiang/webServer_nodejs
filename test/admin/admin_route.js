const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_route', function () {

  this.timeout(60000);

  let server;
  let Admin_route;

  const name = 'proxy';
  const name1 = 'proxy1';
  const name2 = 'proxy2';
  const route = '/ico/proxy';
  const remark = 'ico proxy';
  const interfaces = [
    {method: 'GET', path: '/admin/admin_role'},
    {method: 'POST', path: '/admin/admin_role'},
    {method: 'POST', path: '/admin/admin_role/{id}'},
    {method: 'POST', path: '/admin/admin_role/{id}/delete'},
  ];

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_route = DB.getModel('admin_route');

      return Promise.all([
        Admin_route.destroy({where: {name: [name, name1, name2]}, force: true}),
      ]);
    }).then(() => {
      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#save()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'POST',
        headers: {Authorization},
        body: {
          name,
          route,
          remark,
          interfaces
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('name', name);
        done();
      });
    });


    it('should return object when parameters provided#name1', done => {

      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: name1,
          route,
          remark,
          interfaces
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('name', name1);
        done();
      });
    });


    it('should return error when route exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'POST',
        headers: {Authorization},
        body: {
          name,
          route,
          remark,
          interfaces
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already added');
        done();
      });
    });

  });

  describe('#update()', function () {


    it('should return object when parameters provided', done => {

      Admin_route.findOne({where: {name}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_route/${id}`,
          method: 'POST',
          headers: {Authorization},
          body: {
            name: name2,
            route,
            remark,
            interfaces
          },
          json: true
        });
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('name', name2);
        done();
      });
    });


    it('should return error when role exist', done => {

      Admin_route.findOne({where: {name: name1}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_route/${id}`,
          method: 'POST',
          headers: {Authorization},
          body: {
            name: name2,
            route,
            remark,
            interfaces
          },
          json: true
        });
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already exists');
        done();
      });
    });

  });

  describe('#query()', function () {


    it('should return object when params provied', done => {

      request({
        url: 'http://localhost:9800/admin/admin_route',
        method: 'GET',
        headers: {Authorization},
        qs: {
          page: 1,
          size: 10
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('count');
        data.should.have.property('rows');
        done();
      });
    });

  });

  describe('#queryAll()', function () {


    it('should return object when params provied', done => {

      request({
        url: 'http://localhost:9800/admin/admin_route/all',
        method: 'GET',
        headers: {Authorization},
        json: true
      }).then(data => {
        data.should.be.type('object');
        done();
      });
    });

  });

  describe('#delete()', function () {


    it('should return 1 when params provided', done => {

      Admin_route.findOne({where: {name: name1}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_route/${id}/delete`,
          method: 'POST',
          headers: {Authorization},
          json: true
        });
      }).then(data => {
        data.should.be.equal(1);
        done();
      });
    });


    it('should return error when role does not exist', done => {

      request({
        url: `http://localhost:9800/admin/admin_route/000/delete`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('route does not exist');
        done();
      });
    });

  });

});
