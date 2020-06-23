const crypto = require("crypto");

exports.MD5 = function (data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

exports.SHA1 = function (data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

exports.AHMD5 = function (data) {
  return crypto.createHash('md5').update('osw0@348*%xlbhfow-*lsopa[q;' + data).digest('hex');
}

exports.SHA256 = function (data, privateKey) {
  return crypto.createSign('sha256').update(data, 'utf8').sign(privateKey, 'base64');
}

exports.verifySHA256 = function (data, publicKey, sign) {
  return crypto.createVerify('sha256').update(data, 'utf8').verify(publicKey, sign, 'base64');
}

exports.base64Encoded = function (data) {
  var Buffer = require("buffer").Buffer;
  var buf = new Buffer(data);
  return buf.toString("base64");
}
exports.base64Decoded = function (data) {
  var Buffer = require("buffer").Buffer;
  var buf = new Buffer(data, "base64");
  return buf.toString();
}

exports.signParams = params => {
  const keys = Object.keys(params).sort();
  let str = '';
  keys.forEach(key => {
    str += JSON.stringify(params[key])
  });
  return this.AHMD5(str);
}

exports.salt = (length = 64) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(256, (err, buf) => {
      if (err) return reject(err);
      return resolve(buf.toString('hex').slice(0, length));
    });
  });
}

exports.password = (password, salt, length = 64, digest = 'SHA256') => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, Math.floor(length / 2), digest, (err, data) => {
      if (err) return reject(err);
      return resolve(data.toString('hex'));
    });
  });
}
