const assert = require('assert');
const should = require('should');
// const testServer = require('../../testServer');
const Dotenv = require('dotenv');
Dotenv.config({silent: true, path: '.env'});
const client = require('../../lib/redis').getClient();
const FTMQ = require('../../lib/FTMQ');

describe('util_FTMQ', function () {

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

  describe('#addTopic()', function () {

    it('should return number when topic not exist', done => {
      const mq = new FTMQ.MQ();
      mq.addTopic('register').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return number when topic already exist', done => {
      const mq = new FTMQ.MQ();
      mq.addTopic('register').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return object when topic not exist#multi', done => {
      const mq = new FTMQ.MQ();
      const task = [];
      for (let i = 0; i < 10; i++) {
        task.push(mq.addTopic(`topic${i}`))
      }
      Promise.all(task).then(data => {
        console.log(data);
        done();
      })
    });
  });

  describe('#deleteTopic()', function () {

    it('should return number when topic already exist', done => {
      const mq = new FTMQ.MQ();
      mq.deleteTopic('register').then(data => {
        console.log(data);
        done();
      });
    });

    it('should return number when topic not exist', done => {
      const mq = new FTMQ.MQ();
      mq.deleteTopic('register').then(data => {
        console.log(data);
        done();
      });
    });
  });

  describe('#queryAllTopic()', function () {

    it('should return number when topic already exist', done => {
      const mq = new FTMQ.MQ();
      mq.queryAllTopic().then(data => {
        console.log(data);
        done();
      });
    });
  });

});
