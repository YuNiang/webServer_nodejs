const assert = require('assert');
const should = require('should');
const JWT = require('jsonwebtoken');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');


describe('admin_tb_admin_info', function () {

  this.timeout(60000);

  let server;
  let TB_admin_info;

  const sOpenId = 'sOpenId001';
  const sOpenId02 = 'sOpenId002';

  const session = {
    type: 'admin',
    username: 'fullstack',
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
        TB_admin_info.destroy({where: {sOpenId: sOpenId02}, force: true}),
      ]);
    }).then(() => {

      done();
    });
  });

  // beforeEach(done => {
  // });

  after(done => {
    Promise.all([
      TB_admin_info.destroy({where: {sOpenId}, force: true}),
      TB_admin_info.destroy({where: {sOpenId: sOpenId02}, force: true}),
    ]).then(data => {
      done();
    });
  });

  describe('#query()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/admin/tb_admin_info',
        method: 'GET',
        headers: {Authorization},
        json: true
      }).then(data => {
        data.should.have.property('count');
        data.should.have.property('rows');
        done();
      });
    });

  });

  describe('#checkPass()', function () {

    let doc;

    before(done => {
      TB_admin_info.create({sOpenId, iStatus: 0}).then(data => {
        doc = data;
        done();
      });
    });

    it('should return object when parameters provided', done => {

      request({
        url: `http://localhost:9800/admin/tb_admin_info/${doc.id}/checkPass`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).then(data => {
        data.should.have.property('iStatus');
        data.should.have.property('iRoleId');
        done();
      });
    });

  });

  describe('#checkNotPass()', function () {

    let doc;

    before(done => {
      TB_admin_info.create({sOpenId: sOpenId02, iStatus: 0}).then(data => {
        doc = data;
        done();
      });
    });

    it('should return object when parameters provided', done => {

      request({
        url: `http://localhost:9800/admin/tb_admin_info/${doc.id}/checkNotPass`,
        method: 'POST',
        headers: {Authorization},
        json: true
      }).then(data => {
        data.should.have.property('iStatus');
        done();
      });
    });

  });

});
