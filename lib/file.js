const fs = require('fs');
const util_encrypt = require('./encrypt');
const COS = require('cos-nodejs-sdk-v5');
const cos = new COS({
  SecretId: process.env.TENTCENT_SECRET_ID,
  SecretKey: process.env.TENTCENT_SECRET_KEY,
});
const BucketPublic = process.env.COS_BUCKET_PUBLIC;
const BucketPrivate = process.env.COS_BUCKET_PRIVATE;
const BucketStatic = process.env.COS_BUCKET_STATIC;
const Region = process.env.COS_REGION;

const MIMEType = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
};

/**
 * save with file
 * @param filename
 * @param path
 * @param contentType
 * @param dir
 * @param protect
 * @returns {Promise<*>}
 */
exports.saveWithFile = async (filename, path, contentType, dir, protect) => {
  if (!MIMEType[contentType]) throw new Error('unsupported type');
  // const name = `${util_encrypt.MD5(filename + Math.random())}.${MIMEType[contentType]}`;
  const name = filename;
  const key = `${dir}/${name}`;
  const result = await this.putObjectWithFile(key, path, protect);
  if (protect) return key;
  return result.Location.replace(/^(http:\/\/|https:\/\/|\/\/|)(.*)/, 'https://$2');
};

exports.putObjectWithFile = async (key, filePath, protect) => {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: protect ? BucketPrivate : BucketPublic,
      Region,
      Key: key,
      Body: fs.createReadStream(filePath),
      ContentLength: fs.statSync(filePath).size
    }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  })
};

exports.getObjects = async (key) => {
  return new Promise((resolve, reject) => {
    cos.getBucket({
      Bucket: BucketPrivate,
      Region,
      Prefix: key,
    }, (err, data) => {
      if (err) return reject(err);
      return resolve(data.Contents);
    });
  })
};

// fromKey: matchGif/LPL_MATCH_2_1922053/
// toKey: matchGif/6080/1/246
exports.copyObjectFromPrivateToStatic = async (fromKey, toKey) => {
  return new Promise((resolve, reject) => {
    cos.putObjectCopy({
      Bucket: BucketStatic,
      Region,
      Key: toKey,
      CopySource: `${BucketPrivate}.cos.${Region}.myqcloud.com/${fromKey}`
    }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  })
};

exports.signatureUrl = key => {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: BucketPrivate,
      Region,
      Key: key,
      Expires: 60,
      Sign: true,
    }, function (err, data) {
      if (err) return reject(err);
      return resolve(data.Url);
    });
  })
};
