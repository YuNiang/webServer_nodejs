const assert = require('assert');
const should = require('should');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const request = require('request-promise');
const config = require('../../config/config');
const testServer = require('../../testServer');


describe('admin_file', function () {

  this.timeout(60000);

  const session = {
    type: 'admin',
    username: 'fullstack',
    expire: Date.now() + 24 * 7 * 3600000 //24小时
  };
  const Authorization = JWT.sign(session, process.env.JWT_SECRET);

  before(done => {
    testServer.start().then(data => {
      done();
    });
  });

  describe('#upload()', function () {


    it('should return object when parameters provided', done => {

      request({
        url: 'http://localhost:9800/admin/file/upload',
        method: 'POST',
        headers: {Authorization},
        formData: {
          file: fs.createReadStream(__dirname + '/file.js'),
          dir: '/file',
          protect: 0,
        },
        json: true
      }).then(data => {
        console.log(data);
        done();
      });
    });

  });

});
