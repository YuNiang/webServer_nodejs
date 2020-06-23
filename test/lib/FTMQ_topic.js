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

  describe('#addChannel()', function () {

    it('should return number when channel not exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.addChannel('bonus').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return number when channel already exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.addChannel('bonus').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return object when channel not exist#multi', done => {
      const topic = new FTMQ.Topic(topicName);
      const task = [];
      for (let i = 0; i < 10; i++) {
        task.push(topic.addChannel(`bonus${i}`))
      }
      Promise.all(task).then(data => {
        console.log(data);
        done();
      })
    });
  });

  describe('#deleteChannel()', function () {

    it('should return number when channel already exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.deleteChannel('bonus').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return number when channel not exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.deleteChannel('bonus').then(data => {
        console.log(data);
        done();
      });
    });
  });

  describe('#queryAllChannel()', function () {

    it('should return object when channel already exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.queryAllChannel().then(data => {
        console.log(data);
        done();
      });
    });
  });

  describe('#queueMessage()', function () {

    it('should return object when channel already exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.queueMessage({message: 'message'}).then(data => {
        console.log(data);
        done();
      });
    });

    it('should return object when channel already exist', done => {
      const topic = new FTMQ.Topic(topicName);
      topic.queueMessage({message: 'message'}).then(data => {
        console.log(data);
        done();
      });
    });

    it('should return object when channel already exist#multi', done => {
      const topic = new FTMQ.Topic(topicName);
      const task = [];
      for (let i = 0; i < 100; i++) {
        task.push(topic.queueMessage({message: 'message'}));
      }
      Promise.all(task).then(data => {
        data.should.be.type('object');
        done();
      })
    });
  });

});
