const Geetest = require('gt3-sdk');
const client = require('./redis').getClient();
const captcha = new Geetest({
  geetest_id: 'ebf7c2487f9a528a8639be532f5e2cf0',
  geetest_key: '877a4f4011d5dfac0d8ae4f287abaf20'
});

const keyPrefix = 'verification_';

/**
 * set
 * @param key
 * @returns {Promise}
 */
exports.set = key => {
  return new Promise((resolve, reject) => {
    let result;
    captcha.register(null, (err, data) => {
      if (err) return reject(err);
      result = data;
      return client.setexAsync([keyPrefix + key, 300, data.success]);
    }).then(() => resolve(result));
  })
}

/**
 * get
 * @param key
 * @returns {Promise}
 */
exports.get = key => {
  return client.getAsync(keyPrefix + key);
}

/**
 * remove
 * @param key
 * @returns {Promise}
 */
exports.remove = key => {
  return client.delAsync(keyPrefix + key);
}

/**
 * validate
 * @param key
 * @param geetest_challenge
 * @param geetest_validate
 * @param geetest_seccode
 * @returns {Promise}
 */
exports.validate = (key, geetest_challenge, geetest_validate, geetest_seccode) => {
  return new Promise((resolve, reject) => {
    let result;
    return this.get(key).then(data => {
      result = !data;
    //   return this.remove(key);
    // }).then(() => {
      captcha.validate(result, {
        geetest_challenge,
        geetest_validate,
        geetest_seccode
      }, (err, success) => {
        if (err) return reject(err);
        if (!success) return reject(new Error('verification failed'));
        resolve(success);
      });
    });
  })
}
