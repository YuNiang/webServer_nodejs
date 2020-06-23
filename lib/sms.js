// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const config = require('../config/config');

// Create an SNS service object
const sns = new AWS.SNS({apiVersion: '2010-03-31', region: 'ap-northeast-1'});

/**
 * send
 * @param message
 * @param to
 * @param countryCode
 */
exports.send = (message, to, countryCode) => {
  return new Promise((resolve, reject) => {
    sns.publish({
      PhoneNumber: `+${countryCode}${to}`,
      // Message: `#${config.website}#${message}`,
      Message: `${message}`,
    }, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    })
  })
}
