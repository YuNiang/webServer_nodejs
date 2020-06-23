const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_captcha = require('../../lib/captcha');

describe('util_captcha', function () {

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
      util_captcha.generate().then(data => {
        data.should.be.type('object');
        done();
      });
    });
  });

  describe('#validate()', function () {

    it('should return true', done => {

      let sign;

      util_captcha.generate().then(data => {

        sign = data.sign;
        return util_captcha.get(sign);
      }).then(data => {

        return util_captcha.validate(sign, data);
      }).then(data => {
        data.should.be.equal(true);
        done();
      });
    });

    it('should return error#captcha expired', done => {
      util_captcha.generate().then(data => {

        return util_captcha.validate(data.sign + '_', 'sssss');
      }).catch(err => {
        err.message.should.be.equal('captcha expired');
        done();
      });
    });

    it('should return error#verification code error', done => {
      util_captcha.generate().then(data => {

        return util_captcha.validate(data.sign, 'sssss');
      }).catch(err => {
        err.message.should.be.equal('verification code error');
        done();
      });
    });
  });

});
