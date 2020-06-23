const jwt = require('jsonwebtoken');

/**
 * generate token
 */
exports.sign = (data, secret) => {
  return jwt.sign(data, secret);
};

/**
 * verify
 */
exports.verify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  })
};

/**
 * decode
 */
exports.decode = (token) => {
  return jwt.decode(token);
};
