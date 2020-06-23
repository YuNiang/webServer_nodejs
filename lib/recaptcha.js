const request = require('request-promise');

const url_prefix = 'https://www.recaptcha.net/recaptcha/api';

/**
 * verify
 * @param token
 * @returns {*}
 */
exports.verify = token => {

  /*
  {
    "success": true|false,
    "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    "error-codes": [...]        // optional
  }
   */

  return request({
    url: `${url_prefix}/siteverify`,
    method: 'POST',
    form: {
      secret: '6LdmaKMUAAAAANsY-J9fySFHnne_8ZzI8ybEGiVB',
      response: token
    },
    json: true
  });
};

this.verify('03AOLTBLRpHrey2d0kQwqtiO2Xk4PPwxQjGcG_JNHQDtutavQY7PQpJPtpbBOaFWHAetT1jVtxHkz-UJoluuGgeyTQzYVG1-dvVtA3P5LsA-sYQuyi6ZzGm4dpDK3HpxVT2OXlRAdNSAz3zjOUhEBBctU9_eZuwbGiv5pCSl9YMep8jHX6ZhsOtqggyByX7fF3i-_cQb5xNUJ_-QYeoAJNRv3nCbS-pHp3I7bQzSrH0V4h4EII5i4zKFpDzwVko3iJKsMG4A3AvuaImaNS63prUNfhP_UuF_NeVHswtnowADNB2bEGOT5GD52tUDE20n_WpVuBFSBXpJIE').then(data => {
  console.log(data);
})
