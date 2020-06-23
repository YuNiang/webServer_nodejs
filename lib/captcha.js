const svgCaptcha = require('svg-captcha');
// const svg2png = require("svg2png");
const client = require('./redis').getClient();
const util_encrypt = require('./encrypt');

const key_prefix = 'captcha_';

/**
 * generate
 */
exports.generate = (width = 150, height = 50) => {

  const captcha = svgCaptcha.create({width, height});
  const sign = util_encrypt.AHMD5(Date.now() + captcha.text);
  const key = key_prefix + sign;

  return client.setexAsync([key, 60, captcha.text]).then(() => {

    return {sign, data: captcha.data};
  });
}

/**
 * validate
 * @param sign
 * @param text
 */
exports.validate = (sign, text) => {

  const key = key_prefix + sign;

  return client.getAsync(key).then(data => {
    if (!data) throw new Error('verification code has expired');
    if (data.toString().toLowerCase() != text.toString().toLowerCase()) throw new Error('incorrect verification code');

    return client.delAsync(key);
  }).then(() => {

    return true;
  });
}

/**
 * get
 * @param sign
 */
exports.get = sign => {

  const key = key_prefix + sign;

  return client.getAsync(key);
}
