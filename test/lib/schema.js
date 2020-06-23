const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_schema = require('../../lib/schema');

describe('util_schema', function () {

  this.timeout(60000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  // describe('#handle()', function () {
  //
  //   it('should return object', done => {
  //     util_schema.handle('test').then(data => {
  //       console.log(data);
  //       done();
  //     })
  //   });
  // });

  describe('#generate()', function () {

    it('should return object', done => {
      util_schema.generate().then(data => {
        console.log(data);
        done();
      });
    });
  });

});
