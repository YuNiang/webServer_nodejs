const prefix = 'queue_';

const client = {};

exports.insert = (name, msg) => {
  if (!client[name]) client[name] = {
    insert: require('./redisMatchEngine').getClient(),
    get: require('./redisMatchEngine').getClient(),
    remove: require('./redisMatchEngine').getClient()
  };
  const key = prefix + name;
  return client[name].insert.lpushAsync(key, JSON.stringify(msg));
}

exports.get = (name, timeout) => {
  if (!client[name]) client[name] = {
    insert: require('./redisMatchEngine').getClient(),
    get: require('./redisMatchEngine').getClient(),
    remove: require('./redisMatchEngine').getClient()
  };
  const key = prefix + name;
  const key_ = key + '_';
  //查看未删除的消息
  return client[name].get.lindexAsync(key_, 0).then(data => {
    if (data) return Promise.resolve(data);
    if (!timeout) return client[name].get.rpoplpushAsync(key, key_);
    return client[name].get.brpoplpushAsync([key, key_, timeout]);
  });
}

exports.remove = (name, msg) => {
  if (!client[name]) client[name] = {
    insert: require('./redisMatchEngine').getClient(),
    get: require('./redisMatchEngine').getClient(),
    remove: require('./redisMatchEngine').getClient()
  };
  const key = prefix + name;
  const key_ = key + '_';
  return client[name].remove.lremAsync([key_, 0, msg]);
}

exports.error = (name) => {
  if (!client[name]) client[name] = {
    insert: require('./redisMatchEngine').getClient(),
    get: require('./redisMatchEngine').getClient(),
    remove: require('./redisMatchEngine').getClient()
  };
  const key = prefix + name;
  const key_ = key + '_';
  const key_error = key + '_error';
  return client[name].get.rpoplpushAsync(key_, key_error);
}
