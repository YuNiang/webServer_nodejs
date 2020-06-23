const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const config = require('../../config/config');

describe('config', function () {

  this.timeout(60000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  describe('#generate()', function () {

    it('should return object', done => {
      const value = config.attributes.master_register.asset();
      console.log(value);
      done();
    });
  });

});
