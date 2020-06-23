const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_sms = require('../../lib/sms');

describe('util_sms', function() {

  this.timeout(5000);

  describe('#send()', function() {

    it('should return object when params provided', done => {
      util_sms.send('Hello world!', '18223573039', '86').then(data => {
        data.should.be.type('object');
        data.should.have.property('MessageId');
        done();
      })
    });

    it('should return err when PhoneNumber mistake', done => {
      util_sms.send('Hello world!', '18223573039_', '86').catch(err => {
        err.should.be.type('object');
        done();
      })
    });

    it('should return err when countryCode mistake', done => {
      util_sms.send('Hello world!', '18223573039', '86_').catch(err => {
        err.should.be.type('object');
        done();
      })
    });
  });

});
