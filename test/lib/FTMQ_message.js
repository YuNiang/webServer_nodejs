const assert = require('assert');
const should = require('should');
// const testServer = require('../../testServer');
const Dotenv = require('dotenv');
Dotenv.config({silent: true, path: '.env'});
const client = require('../../lib/redis').getClient();
const FTMQ = require('../../lib/FTMQ');

describe('util_FTMQ_topic', function () {

  this.timeout(60000);

  let server;

  before(done => {
    client.flushallAsync().then(() => {
      done();
    });
    // testServer.start().then(data => {
    //   server = data;
    //   done();
    // });
  });

  const topicName = 'register';

  before(done => {

    const topic = new FTMQ.Topic(topicName);

    setInterval(() => {
      topic.queueMessage({timestamp: Date.now()});
    }, 1000);

    done();
  });

  describe('#getMessage()', function () {

    it('should return string', done => {
      done();

      const channel1Name = 'bonus1';
      const channel2Name = 'bonus2';
      const channel1 = new FTMQ.Channel(topicName, channel1Name);
      const channel2 = new FTMQ.Channel(topicName, channel2Name);

      const handle = (channel) => {
        channel.getMessage(10).then(data => {
          console.log(channel.channel, data);
          return channel.deleteMessage();
        }).then(() => {
          return handle(channel);
        });
      };
      handle(channel1);
      handle(channel2);
    });
  });

});
