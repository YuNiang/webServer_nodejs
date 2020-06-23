const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.getClient = () => process.env.REDIS_NEEDPASS == 1 ? redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
}) : redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})
