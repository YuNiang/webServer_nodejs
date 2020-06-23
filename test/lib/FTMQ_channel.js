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
    const mq = new FTMQ.MQ();
    mq.addTopic(topicName).then(() => {
      done();
    })
  });

  const channelName = 'bonus';

  before(done => {
    const topic = new FTMQ.Topic(topicName);
    topic.addChannel(channelName).then(() => {
      done();
    })
  });

  before(done => {

    const topic = new FTMQ.Topic(topicName);
    Promise.all([
      topic.queueMessage({message: 'message1'}),
      topic.queueMessage({message: 'message2'}),
      topic.queueMessage({message: 'message3'}),
      topic.queueMessage({message: 'message4'}),
      topic.queueMessage({message: 'message5'})
    ]).then(() => {

      done();
    });

  });

  describe('#getMessage()', function () {

    it('should return string', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.getMessage().then(data => {
        data.should.be.type('string');
        data.should.be.equal(JSON.stringify({message: 'message1'}));
        done();
      });
    });

    it('should return string when multi get message', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      Promise.all([
        channel.getMessage(),
        channel.getMessage()
      ]).then(([msg1, msg2]) => {
        msg1.should.be.equal(msg2);
        done();
      });
    });
  });

  describe('#deleteMessage()', function () {

    before(done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.getMessage().then(() => {
        done();
      });
    });

    it('should return number 1 when current message exist', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.deleteMessage().then(data => {
        data.should.be.equal(1);
        done();
      });
    });

    it('should return number 0 when current message not exist', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.deleteMessage().then(data => {
        data.should.be.equal(0);
        done();
      });
    });
  });

  describe('#errorMessage()', function () {

    before(done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.getMessage().then(() => {
        done();
      });
    });

    it('should return string when current message exist', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.errorMessage().then(data => {
        data.should.be.type('string');
        done();
      });
    });

    it('should return null when current message exist', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.errorMessage().then(data => {
        should(data).be.equal(null);
        done();
      });
    });
  });

  describe('#getMessage()#timeout', function () {

    it('should return string', done => {
      const channel = new FTMQ.Channel(topicName, channelName);
      channel.getMessage(10).then(data => {
        data.should.be.type('string');
        data.should.be.equal(JSON.stringify({message: 'message3'}));
        done();
      });
    });
  });

});
