const assert = require('assert');
const should = require('should');
const util_queueTask = require('../../lib/queueTask');


describe('lib_queueTask', function () {

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

      const queueTask = new util_queueTask.QueueTask(service);

      for (let i = 0; i < taskLength; i++) {
        queueTask.insert([i, i + 1]);
      }
    });

  });

  describe('#insert with max', function () {

    it(`should return object when params provided`, done => {

      const taskLength = 5;
      const maxLength = 3;
      let counter = 0;

      const service = (a, b) => {
        return Promise.resolve().then(() => {
          console.log('******', a, b);
          // if (++counter == maxLength) done();
          return;
        })
      };

      const queueTask = new util_queueTask.QueueTask(service, maxLength);

      for (let i = 0; i < taskLength; i++) {
        queueTask.insert([i, i + 1]);
      }

      done();
    });

  });

});
