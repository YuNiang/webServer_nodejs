const assert = require('assert');
const should = require('should');
const util_queueMultiTask = require('../../lib/queueMultiTask');


describe('util_queueMultiTask', function () {

  this.timeout(60000);

  describe('#insert', function () {

    it(`should return object when params provided`, done => {

      const taskLength = 5;
      let counter = 0;

      const service = (a, b) => {
        return Promise.resolve().then(() => {
          console.log('******', a, b);
          if (++counter == taskLength) done();
          return;
        })
      };

      const queueTask = new util_queueMultiTask.QueueMultiTask(service);

      for (let i = 0; i < taskLength; i++) {
        queueTask.insert([i, i + 1]);
      }
    });

  });

  describe('#insert with max', function () {

    it(`should return object when params provided`, done => {

      const taskLength = 20;
      const size = 5;

      const service = (a, b) => {
        return Promise.resolve().then(() => {
          console.log('******', a, b);
          // if (++counter == maxLength) done();
          return;
        })
      };

      const queueTask = new util_queueMultiTask.QueueMultiTask(service, size);

      for (let i = 0; i < taskLength; i++) {
        queueTask.insert([i, i + 1]);
      }

      done();
    });

  });

});
