const fs = require('fs');
const client = require('./redis').getClient();

/**
 * getClientIp
 * @param req
 * @returns {*|string|string}
 */
exports.getClientIp = ({raw: {req}}) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  return ip.split(',')[0];
}

/**
 * get score
 * @param ip
 */
exports.getScore = ip => {
  let score = '';
  ip.split('.').map(num => {
    score += (Array(3).join(0) + num).slice(-3);
  });
  return parseInt(score);
}

/**
 * store ip segment
 * @param country
 */
exports.storeIPSegment = (country = 'CN') => {

  const keyIPSegment = `IPSegment_${country}`;

  const file = fs.readFileSync('resource/IP.txt').toString();
  const content = file.match(/(apnic\|.*\|ipv4.*\|(assigned|allocated))/g);

  let array_store = [];

  content.forEach(item => {
    const [,countryCode,,startIp,count,,status] = item.split('|');
    if (country == countryCode && status == 'allocated') {
      const endIp = this.getIncrementIp(startIp, count);
      const start = this.getScore(startIp);
      const end = this.getScore(endIp);
      array_store = [...array_store, ...[start, 'start_' + start, end, 'end_' + end]];
    }
  })

  return client.delAsync(keyIPSegment).then(() => {
    return client.zaddAsync([keyIPSegment, ...array_store]);
  });
}

/**
 * store ip segment
 * @param country
 */
exports.isBelong = (ip, country = 'CN') => {

  const keyIPSegment = `IPSegment_${country}`;

  const score = this.getScore(ip);

  const multi = client.multi();
  multi.zrevrangebyscore([keyIPSegment, `(${score}`, '-inf', 'limit', 0, 1]);
  multi.zrangebyscore([keyIPSegment, `(${score}`, '+inf', 'limit', 0, 1]);
  return multi.execAsync().then(([[start], [end]]) => {
    return /start/.test(start) && /end/.test(end) ? true : false;
  });
}

/**
 * get increment ip
 * @param ip
 * @param count
 */
exports.getIncrementIp = (ip, count) => {

  const array = ip.split('.');
  array.forEach((item, index) => {
    array[index] = parseInt(item);
  });
  let [s1, s2, s3, s4] = array;
  const start = s4 + s3 * Math.pow(256, 1) + s2 * Math.pow(256, 2) + s1 * Math.pow(256, 3);
  let e1, e2, e3, e4;
  let end = start + parseInt(count);

  e1 = parseInt(end / Math.pow(256, 3));
  end -= e1 * Math.pow(256, 3);
  e2 = parseInt(end / Math.pow(256, 2));
  end -= e2 * Math.pow(256, 2);
  e3 = parseInt(end / Math.pow(256, 1));
  end -= e3 * Math.pow(256, 1);
  e4 = end;

  return [e1, e2, e3, e4].join('.');
}
