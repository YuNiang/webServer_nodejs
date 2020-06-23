const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_userRole', function () {

  this.timeout(60000);

  let server;
  let Admin_user;
  let Admin_role;
  let Admin_userRole;
  let user;
  let role;

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_user = DB.getModel('admin_user');
      Admin_role = DB.getModel('admin_role');
      Admin_userRole = DB.getModel('admin_userRole');

      return Promise.all([
        Admin_role.destroy({where: {}, force: true}),
        Admin_userRole.destroy({where: {}, force: true}),
      ]);
    }).then(() => {

      // query user
      return Admin_user.findOne({where: {username: 'fullstack'}});
    }).then(data => {
      user = data;
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
        data.should.be.type('object');
        data.should.have.property('userId', user.id);
        done();
      });
    });


    it('should return error when userRole exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_userRole',
        method: 'POST',
        headers: {Authorization},
        body: {
          userId: user.id,
          roleId: role.id
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already added');
        done();
      });
    });


    it('should return error when user does not exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_userRole',
        method: 'POST',
        headers: {Authorization},
        body: {
          userId: 0,
          roleId: role.id
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('user does not exist');
        done();
      });
    });


    it('should return error when role does not exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_userRole',
        method: 'POST',
        headers: {Authorization},
        body: {
          userId: user.id,
          roleId: 0
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('role does not exist');
        done();
      });
    });

  });

  describe('#query()', function () {


    it('should return object when params provied', done => {

      request({
        url: 'http://localhost:9800/admin/admin_userRole',
        method: 'GET',
        headers: {Authorization},
        qs: {
          page: 1,
          size: 10,
          userId: user.id
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('count');
        data.should.have.property('rows');
        data.rows[0].should.have.property('role');
        done();
      });
    });

  });

  describe('#delete()', function () {


    it('should return 1 when params provided', done => {

      Admin_userRole.findOne({where: {userId: user.id}}).then(({id}) => {

        return request({
          url: `http://localhost:9800/admin/admin_userRole/${id}/delete`,
          method: 'POST',
          headers: {Authorization},
          json: true
        });
      }).then(data => {
        data.should.be.equal(1);
        done();
      });
    });


    it('should return error when user role does not exist', done => {

      request({
        url: `http://localhost:9800/admin/admin_userRole/000/delete`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('user role does not exist');
        done();
      });
    });

  });

});
