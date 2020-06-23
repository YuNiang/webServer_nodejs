const assert = require('assert');
const should = require('should');
const JWT = require('jsonwebtoken');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');


describe('admin_tb_player_info', function () {

  this.timeout(60000);

  let server;
  let TB_player_info;

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
      TB_player_info = DB.getModel('tb_player_info');

      return Promise.all([
        // TB_player_info.destroy({where: {sOpenId}, force: true}),
      ]);
    }).then(() => {

      done();
    });
  });

  // beforeEach(done => {
  // });

  // after(done => {
  //   Promise.all([
  //     TB_player_info.destroy({where: {sOpenId}, force: true}),
  //     TB_player_info.destroy({where: {sOpenId: sOpenId02}, force: true}),
  //   ]).then(data => {
  //     done();
  //   });
  // });

  describe('#query()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/admin/tb_player_info',
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

  describe('#save()', function () {

    let doc;

    const IDNumber = '88888888';

    before(done => {
      TB_player_info.destroy({where: {IDNumber}, force: true}).then(data => {
        doc = data;
        done();
      });
    });

    it('should return object when parameters provided', done => {

      request({
        url: `http://localhost:9800/admin/tb_player_info`,
        method: 'POST',
        headers: {Authorization},
        body: {IDNumber},
        json: true
      }).then(data => {
        doc = data;
        data.should.have.property('IDNumber');
        done();
      });
    });


    describe('#update()', function () {

      it('should return object when parameters provided', done => {

        request({
          url: `http://localhost:9800/admin/tb_player_info/${doc.id}`,
          method: 'POST',
          headers: {Authorization},
          body: {Name: 'Jack'},
          json: true
        }).then(data => {
          data.should.have.property('Name');
          done();
        });
      });

    });

  });

});
