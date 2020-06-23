const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_role', function () {

  this.timeout(60000);

  let server;
  let Admin_role;

  const name = 'proxy';
  const name1 = 'proxy1';
  const name2 = 'proxy2';
  const remark = 'ico proxy';

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_role = DB.getModel('admin_role');

      return Promise.all([
        Admin_role.destroy({where: {name: [name, name1, name2]}, force: true}),
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
        url: 'http://localhost:9800/admin/admin_role',
        method: 'POST',
        headers: {Authorization},
        body: {
          name,
          remark
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
        url: 'http://localhost:9800/admin/admin_role',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: name1,
          remark
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('name', name1);
        done();
      });
    });


    it('should return error when role exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_role',
        method: 'POST',
        headers: {Authorization},
        body: {
          name,
          remark
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

      Admin_role.findOne({where: {name}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_role/${id}`,
          method: 'POST',
          headers: {Authorization},
          body: {
            name: name2,
            remark
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

      Admin_role.findOne({where: {name: name1}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_role/${id}`,
          method: 'POST',
          headers: {Authorization},
          body: {
            name: name2,
            remark
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
        url: 'http://localhost:9800/admin/admin_role',
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

  describe('#delete()', function () {


    it('should return 1 when params provided', done => {

      Admin_role.findOne({where: {name: name1}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_role/${id}/delete`,
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
        url: `http://localhost:9800/admin/admin_role/000/delete`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('role does not exist');
        done();
      });
    });

  });

});
