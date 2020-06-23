const assert = require('assert');
const should = require('should');
const util_2FA = require('../../lib/2FA');


describe('util_2FA', function () {

  describe('#generateSecret()', function () {


    it('should return object', done => {

      const secret = util_2FA.generateSecret('www.supertoken.pro', '18223573039@163.com');
      secret.should.have.property('base32');
      console.log(secret);
      done();
    });

  });

  describe('#verify()', function () {


    it('should return true', done => {

      const secret = 'IE3EMRZPPVJXGLZXMFTEYOSQIQVHKLS6IFCXEKCYKQSXKI23KJAA';
      const token = util_2FA.generateToken(secret);
      const result = util_2FA.verify(secret, token);
      result.should.ok();
      done();
    });

    it('should return false', done => {

      const secret = 'IE3EMRZPPVJXGLZXMFTEYOSQIQVHKLS6IFCXEKCYKQSXKI23KJAA';
      const token = '123456'
      const result = util_2FA.verify(secret, token);
      result.should.not.ok();
      done();
    });


  });

});
