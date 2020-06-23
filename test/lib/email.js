const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_email = require('../../lib/email');

describe('util_email', function() {

  this.timeout(60000);

  describe('#send()', function() {

    it('should return object when params provided', done => {

      util_email.send('TEST', 'Hello world!!!', '18223573039@163.com').then(data => {
        console.log(data);
        done();
      }).catch(err => {
        console.log(err)
      });

    });

    // it('should return object when params provided', done => {
    //
    //   util_email.send('TEST', 'Hello world!!!', '1303326739@qq.com').then(data => {
    //     console.log(data);
    //     done();
    //   });
    //
    // });
  });

});
