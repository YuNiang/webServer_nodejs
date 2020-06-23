
/**
 * sleep
 * @param duration ms
 * @returns {Promise}
 */
exports.sleep = duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
