const client = require('./redis').getClient();
const util_number = require('./number');


const types = {
  order: {code: 2, level: 3},
  orderFast: {code: 3, level: 2},
  fund_in_out: {code: 4, level: 4},
  deposit: {code: 5, level: 2},
  withdraw: {code: 6, level: 2},
  tradeRecord: {code: 7, level: 4},
  otc: {code: 8, level: 2},
  otcOrder: {code: 9, level: 2},
  message: {code: 10, level: 2},
  bankAccount: {code: 11, level: 2},
};


/**
 * generate
 * @param type
 * @returns {Promise.<*>}
 */
exports.generate = () => {
  const timestamp = parseInt(Date.now() / 1000 + 2);
  const multi = client.multi();
  Object.keys(types).forEach(type => {
    const key_pool = `id_pool_${types[type].level}`;
    const key_ids = `id_${type}_${timestamp}`;
    multi.sunionstore(key_ids, key_pool);
    multi.expire(key_ids, 3);
  });
  return multi.execAsync();
};

/**
 * generate base code
 */
exports.generateBaseCode = () => {

  // check whether generated
  return client.existsAsync('id_pool_1').then(data => {
    if (data) return;

    // generate id pool
    const multi = client.multi();
    const levels = [1, 2, 3, 4, 5, 6];
    levels.forEach(level => multi.sadd([`id_pool_${level}`, ...new Array(Math.pow(10, level)).keys()]));
    return multi.execAsync();
  });
};

/**
 * get
 * @param type
 * @param code
 * @returns {*}
 */
exports.get = (type, code = 0) => {
  if (!types[type]) return Promise.reject(new Error('unsupported type'));
  // timestamp
  const timestamp = parseInt(Date.now() / 1000);
  // key
  const key = `id_${type}_${timestamp}`;
  // get random number
  return client.spopAsync(key).then(data => {
    // combination (type code + code + timestamp + random number)
    const id = types[type].code + util_number.fill(code, 2) + timestamp + util_number.fill(data, 6);
    return id;
  });
};

/**
 * gets
 * @param type
 * @param length
 * @param code
 * @returns {Promise.<*>}
 */
exports.gets = (type, length, code = 0) => {
  if (!types[type]) return Promise.reject(new Error('unsupported type'));
  if (isNaN(length)) return Promise.reject(new Error('length must be a number'));
  length = parseInt(length);
  let task = [];
  for (let i = 0; i < length; i++) {
    task.push(this.get(type, code))
  }
  return Promise.all(task);
};
