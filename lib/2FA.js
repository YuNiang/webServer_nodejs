const speakeasy = require('speakeasy');
const encoding = 'base32';

/**
 * generate secret
 * @param issuer
 * @param label
 */
exports.generateSecret = (issuer, label) => {
  const data = speakeasy.generateSecret({length: 20});
  data.otpauth_url = speakeasy.otpauthURL({secret: data.ascii, issuer, label});
  return data;
};

/**
 * generate token
 */
exports.generateToken = (secret) => {
  return speakeasy.totp({secret, encoding});
};

/**
 * verify
 */
exports.verify = (secret, token) => {
  return speakeasy.totp.verify({secret, token, encoding});
};
