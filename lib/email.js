const nodemailer = require('nodemailer');
const config = require('../config/config');

const auth = {
  noReply: {
    host: process.env.SMTP_HOST,
    from: process.env.SMTP_FROM,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

/**
 * 发送
 * @param subject
 * @param message
 * @param to
 * @returns {Promise}
 */
exports.send = (subject, message, to) => {

  return new Promise((resolve, reject) => {

    // create reusable transporter object using SMTP transport
    const smtpTransport = nodemailer.createTransport({
      host: auth.noReply.host, // hostname
      secureConnection: true, // use SSL
      port: 465,
      auth: auth.noReply
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: `${config.website}<${auth.noReply.from}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: message, // plaintext body
      html: message // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (err, info) {
      if (err) return reject(err);
      resolve(info);
      // if you don"t want to use this transport object anymore, uncomment following line
      smtpTransport.close(); // shut down the connection pool, no more messages
    });

  });
}
