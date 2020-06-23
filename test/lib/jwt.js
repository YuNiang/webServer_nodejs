const assert = require('assert');
const should = require('should');
const testServer = require('../../testServer');
const util_jwt = require('../../lib/jwt');

describe('util_redis', function() {

  this.timeout(5000);

  describe('#sign()', function() {

    it('should return string', () => {

      const session1 = {
        valid: true,
        username: '18223573039',
        userId: 5,
        exp: Date.now() + 1000 * 24 * 3600000
      };
      const session2 = {
        valid: true,
        username: '18223573039@163.com',
        userId: 6,
        exp: Date.now() + 1000 * 24 * 3600000
      };

      const token1 = util_jwt.sign(session1, process.env.JWT_SECRET);
      const token2 = util_jwt.sign(session2, process.env.JWT_SECRET);

      console.log(token1);
      console.log(token2);

    });
  });

  describe('#verify()', function() {

    it('should return error when secret is wrong', done => {

      const session1 = {
        valid: true,
        username: '18223573039',
        userId: 5,
        exp: Date.now() + 1000 * 24 * 3600000
      };
      const token1 = util_jwt.sign(session1, process.env.JWT_SECRET);

      util_jwt.verify(token1, 'aa').catch(err => {
        console.log(err.message);
        done();
      })

    });

    it('should return object', done => {

      const session1 = {
        valid: true,
        username: '18223573039',
        userId: 5,
        exp: Date.now() + 1000 * 24 * 3600000
      };
      const token1 = util_jwt.sign(session1, process.env.JWT_SECRET);

      util_jwt.verify(token1, process.env.JWT_SECRET).then(data => {
        console.log(data);
        done();
      })

    });
  });

  describe('#decode()', () => {

    it('should return object', done => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidG9rZW4iLCJ1c2VybmFtZSI6IjE4MjIzNTczMDM5QDE2My5jb20iLCJ1c2VySWQiOjAsImV4cCI6MTU0MDExMzMwNjAyNiwiaWF0IjoxNTMxNDczMzA2fQ.ZPw_v2yKlQXBQsn3QjW9z8dP26jdKiGBwY5QWzzVGuk';
      const data = util_jwt.decode(token);
      console.log(data);
      done();
    });

  });

  describe('#sign()', function() {

    it('should return string', () => {

      const session1 = {
        type: 'token',
        username: '18223573039@163.com',
        userId: 0,
        exp: Date.now() + 1000 * 24 * 3600000
      };
      const token1 = util_jwt.sign(session1, process.env.JWT_SECRET);
      console.log(token1);

    });
  });

});
