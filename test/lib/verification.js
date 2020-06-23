const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const config = require('../../config/config');
const util_verification = require('../../lib/verification');


describe('util_verification', function () {

  describe('#set()', function () {


    it('should return object', done => {

      util_verification.set('login_fullstack').then(data => {
        console.log(data);
        done();
      });
    });

  });

  describe('#get()', function () {


    it('should return object', done => {

      util_verification.get('login_fullstack').then(data => {
        done();
      });
    });

  });

  describe('#validate()', function () {


    it('should return object', done => {

      util_verification.validate('login_fullstack', null, null, null).catch(err => {
        console.log(err.message);
        done();
      });
    });

  });

});
