const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const clientPub = require('../../lib/redis').getClient();

describe('util_redis_pub_sub', function () {

  this.timeout(60000);

  let server;

  before(done => {
    testServer.start().then(data => {
      server = data;
      done();
    });
  });

  describe('#publish()', function () {

    const channel = 'ticker';

    before(done => {

      const length = 3;
      let counter = 0;

      for (let i = 0; i < length; i++) {

        const clientSub = require('../../lib/redis').getClient();

        clientSub.on('subscribe', (channel, count) => {
          console.log('client', i, 'subscribe', channel, count);
          counter++;
          if (counter == length) done();
        });

        clientSub.subscribe(channel);

        clientSub.on('message', (channel, data) => {
          console.log('client', i, 'message', channel, data);
        });
      }

    });

    it('should return object', done => {

      clientPub.publish(channel, '{"open":"9.1","close":"8.1","high":"9.1","low":"8.1","vol":"20","last":5.1}');
      done();

    });

    it('should return object#concurrent', done => {

      for (let i = 0; i < 10; i++) {
        clientPub.publish(channel, `${i}_{"open":"9.1","close":"8.1","high":"9.1","low":"8.1","vol":"20","last":5.1}`);
      }
      done();

    });
  });

});
