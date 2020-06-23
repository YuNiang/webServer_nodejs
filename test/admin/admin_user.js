const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_user', function () {

  this.timeout(60000);

  let server;
  let Admin_user;

  const username = 'fullstack';
  const password = '123456';
  const newPassword = '12345678';

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      Admin_user = DB.getModel('admin_user');

      return Promise.all([
        Admin_user.destroy({where: {username}, force: true}),
      ]);
    }).then(() => {
      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#register()', function () {


    it('should return object when parameters provided#Jack', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/register',
        method: 'POST',
        headers: {Authorization},
        body: {
          username,
          password
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('username', username);
        done();
      });
    });


    it('should return error when account exist', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/register',
        method: 'POST',
        headers: {Authorization},
        body: {
          username,
          password
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('already registered');
        done();
      });
    });

  });

  describe('#login()', function () {


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
        data.should.be.type('object');
        data.should.have.property('model');
        data.should.have.property('authorization');
        data.should.have.property('route');
        done();
      });

    });

    it('should return error when password mistake', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/login',
        method: 'POST',
        body: {
          username,
          password: password + '_',
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        done();
      }).catch(err => {
        err.statusCode.should.equal(400);
        err.error.message.should.equal('account or password incorrect');
        done();
      })

    });

    it('should return error when username mistake', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/login',
        method: 'POST',
        body: {
          username: username + '_',
          password,
        },
        json: true
      }).then(data => {
        data.should.be.type('object');
        done();
      }).catch(err => {
        err.statusCode.should.equal(400);
        err.error.message.should.equal('account or password incorrect');
        done();
      })

    });

  });

  describe('#updatePassword()', function () {


    it('should return error when newPassword as same as oldPassword', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/updatePassword',
        method: 'POST',
        headers: {Authorization},
        body: {
          password,
          newPassword: password
        },
        json: true
      }).catch(err => {
        err.statusCode.should.be.equal(400);
        err.error.message.should.be.equal('the new password can not be the same as the original password');
        done();
      });
    });


    it('should return object when parameters provided#Jack', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/updatePassword',
        method: 'POST',
        headers: {Authorization},
        body: {
          password,
          newPassword,
        },
        json: true
      }).then(data => {
        should(data).be.equal(undefined);
        done();
      });
    });


    it('should return object when parameters provided#Jack', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/updatePassword',
        method: 'POST',
        headers: {Authorization},
        body: {
          password: newPassword,
          newPassword: password
        },
        json: true
      }).then(data => {
        should(data).be.equal(undefined);
        done();
      });
    });

  });

  describe('#query()', function () {


    it('should return object when params provied', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user',
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

  describe('#queryForCurrentUser()', function () {


    it('should return object', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/me',
        method: 'GET',
        headers: {Authorization},
        json: true
      }).then(data => {
        data.should.be.type('object');
        data.should.have.property('username');
        done();
      });
    });

  });

});
