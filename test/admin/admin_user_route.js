const assert = require('assert');
const should = require('should');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');

const Authorization = config.authorization.admin;


describe('admin_admin_user_route', function () {

  this.timeout(60000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  // beforeEach(done => {
  // });

  describe('#queryRouteForCurrentUser()', function () {


    it('should return object', done => {

      request({
        url: 'http://localhost:9800/admin/admin_user/me/route',
        method: 'GET',
        headers: {Authorization},
        json: true
      }).then(data => {
        console.log(data);
        data.should.be.type('object');
        done();
      });
    });

  });

});
