const assert = require('assert');
const should = require('should');
const JWT = require('jsonwebtoken');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');


describe('api_tb_admin_info', function () {

  this.timeout(60000);

  let server;
  let TB_admin_info;

  const sOpenId = 'sOpenId001';

  const session = {
    type: 'api',
    username: sOpenId,
    roleId: 0,
    expire: Date.now() + 24 * 7 * 3600000 //24小时
  };
  const Authorization = JWT.sign(session, process.env.JWT_SECRET);

  before(done => {
    testServer.start().then(data => {
      server = data;
      const DB = server.plugins['hapi-sequelize'][process.env.DB_DBNAME];
      TB_admin_info = DB.getModel('tb_admin_info');

      return Promise.all([
        TB_admin_info.destroy({where: {sOpenId}, force: true}),
      ]);
    }).then(() => {
      return TB_admin_info.create({sOpenId});

    }).then(() => {

      done();
    });
  });

  after(done => {
    Promise.all([
      TB_admin_info.destroy({where: {sOpenId}, force: true}),
    ]).then(data => {
      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#applyAdmin()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/api/api/applyAdmin',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: 'fullstack',
          phone: '1820000000',
          teamId: 1,
        },
        json: true
      }).then(data => {
        console.log(data);
        data.should.have.property('sName', 'fullstack');
        done();
      });
    });

    it('should return error when already applied', done => {

      request({
        url: 'http://localhost:9800/api/api/applyAdmin',
        method: 'POST',
        headers: {Authorization},
        body: {
          name: 'fullstack',
          phone: '1820000000',
          teamId: 1,
        },
        json: true
      }).catch(data => {
        data.error.message.should.be.equal('already applied');
        done();
      });
    });

  });

  describe('#getApplyAdminStatus()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/api/api/getApplyAdminStatus',
        method: 'GET',
        headers: {Authorization},
        json: true
      }).then(data => {
        console.log(data);
        data.should.have.property('iStatus');
        done();
      });
    });

  });

});
