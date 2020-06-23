const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const client = require('../../lib/redis').getClient();

describe('util_redis', function () {

  this.timeout(5000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  // describe('#getClient()', function () {
  //
  //   it('should return object', () => {
  //     client.should.be.type('object');
  //   });
  // });

  // describe('#compare client', function () {
  //
  //   it('should equal false', () => {
  //     const array_clientId = [];
  //     for (let i = 0; i < 20; i++) {
  //       const client = require('../../lib/redis').getClient();
  //       array_clientId.push(client.connection_id);
  //     }
  //     console.log(array_clientId)
  //
  //   });
  // });

  describe('#watch()', function () {

    beforeEach(done => {

      const multi = client.multi();
      multi.hmset(['order', 'price', 1, 'amount', 1, 'status', 0, 'tradeType', 'b']);
      multi.hmset(['depth', 1, 1]);
      multi.execAsync().then(() => {
        done();
      });
    });

    // it('should return object', done => {
    //
    //   client.watch('order');
    //   const multi = client.multi();
    //   multi.hincrbyfloat(['order', 'amount', -1]);
    //   multi.execAsync().then(data => {
    //     data.should.be.type('object');
    //     done();
    //   });
    // });
    //
    // it('should return null', done => {
    //
    //   client.watch('order');
    //   const multi = client.multi();
    //   multi.hincrbyfloat(['order', 'amount', -1]);
    //   client.hsetAsync('order', 'status', '2').then(() => {
    //     return multi.execAsync();
    //   }).then(data => {
    //     should(data).be.equal(null);
    //     done();
    //   });
    // });
    //
    // it('should return null', done => {
    //
    //   client.watch('order');
    //   client.hsetAsync('order', 'status', '2').then(() => {
    //     const multi = client.multi();
    //     multi.hincrbyfloat(['order', 'amount', -1]);
    //     return multi.execAsync();
    //   }).then(data => {
    //     should(data).be.equal(null);
    //     done();
    //   });
    // });
    //
    // it('should return null', done => {
    //
    //   client.watch('order');
    //   Promise.all([
    //     client.hsetAsync('order', 'status', '2'),
    //     client.hincrbyfloatAsync(['depth', 1, -1])
    //   ]).then(() => {
    //     const multi = client.multi();
    //     multi.hincrbyfloat(['order', 'amount', -1]);
    //     multi.hincrbyfloat(['depth', 1, -1]);
    //     return multi.execAsync();
    //   }).then(data => {
    //     should(data).be.equal(null);
    //     done();
    //   });
    // });

    it('should return null', done => {

      const task = [];

      const handle = () => {
        const client = require('../../lib/redis').getClient();
        client.watch('order');
        return client.hgetallAsync('order').then(data => {

          if (data.amount != '1') return;

          const multi = client.multi();
          multi.hincrbyfloat(['order', 'amount', -1]);
          multi.hincrbyfloat(['depth', 1, -1]);
          return multi.execAsync();
        });
      }
      task.push(handle(), handle(), handle(), handle(), handle(), handle(), handle());
      Promise.all(task).then(data => {
        console.log(data);
        done();
      });
    });
  });

});
