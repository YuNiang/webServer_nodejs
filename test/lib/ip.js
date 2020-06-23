const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_ip = require('../../lib/ip');

describe('util_ip', function () {

  this.timeout(60000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  describe('#storeIPSegment()', function() {

    it('should return number', done => {
      util_ip.storeIPSegment().then(data => {
        data.should.be.type('number');
        done();
      })
    });
  });

  describe('#isBelong()', function () {

    it('should return true #cloudflare', done => {
      util_ip.isBelong('116.226.153.124').then(data => {
        data.should.be.ok();
        done();
      })
    });

    it('should return true #baidu', done => {
      util_ip.isBelong('111.13.101.208').then(data => {
        data.should.be.ok();
        done();
      })
    });

    it('should return false #Australian', done => {
      util_ip.isBelong('116.250.153.124').then(data => {
        data.should.be.false();
        done();
      })
    });

    it('should return false #Japan', done => {
      util_ip.isBelong('54.95.20.73').then(data => {
        data.should.be.false();
        done();
      })
    });

    it('should return false #Japan', done => {
      util_ip.isBelong('52.69.23.119').then(data => {
        data.should.be.false();
        done();
      })
    });

    it('should return object', done => {
      const task = [];
      for (let i = 0; i < 10000; i++) {
        task.push(util_ip.isBelong('11.20.153.124'));
      }
      Promise.all(task).then(data => {
        data.should.be.type('object');
        done();
      })
    });

    it('should return object', done => {
      const task = [];
      for (let i = 0; i < 10000; i++) {
        task.push(util_ip.isBelong('50.50.153.124'));
      }
      Promise.all(task).then(data => {
        data.should.be.type('object');
        done();
      })
    });

    it('should return object', done => {
      const task = [];
      for (let i = 0; i < 10000; i++) {
        task.push(util_ip.isBelong('116.250.153.124'));
      }
      Promise.all(task).then(data => {
        data.should.be.type('object');
        done();
      })
    });
  });

});
