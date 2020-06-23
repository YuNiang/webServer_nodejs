const client = require('../lib/redis').getClient();

/**
 * query
 * @param server
 * @returns {*}
 */
exports.query = (server) => {
  return client.smembersAsync('admin_interfaces').then(data => {
    return data.map(item => JSON.parse(item));
  });
};

/**
 * validate
 * @param server
 * @param interfaces
 */
exports.validate = (server, interfaces) => {
  const task = interfaces.map(item => client.sismemberAsync(['admin_interfaces', JSON.stringify(item)]));
  return Promise.all(task).then(data => {
    if (data.includes(0)) throw new Error('interface verification failed');
    return true;
  });
};

/**
 * register
 * @param server
 * @param interfaces
 * @returns {*}
 */
exports.register = (server, interfaces) => {
  const rawInterfaces = interfaces.map(item => JSON.stringify(item));
  return client.saddAsync(['admin_interfaces', ...rawInterfaces]);
};
