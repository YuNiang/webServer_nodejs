const redis = require('./redis');

class MQ {

  constructor() {
    this.keyQueue = 'ftmq:topic';
    this.client = redis.getClient();
  }

  addTopic(topic) {
    return this.client.saddAsync([this.keyQueue, topic]);
  }

  deleteTopic(topic) {
    return this.client.sremAsync([this.keyQueue, topic]);
  }

  queryAllTopic() {
    return this.client.smembersAsync([this.keyQueue]);
  }

}

class Topic {

  constructor(topic) {
    this.topic = topic;
    this.keyQueue = `ftmq:topic:${this.topic}:channel`;
    this.client = redis.getClient();
    this.mq = new MQ();
    this.mq.addTopic(topic);
  }

  addChannel(channel) {
    return this.client.saddAsync([this.keyQueue, channel]);
  }

  deleteChannel(channel) {
    return this.client.sremAsync([this.keyQueue, channel]);
  }

  queryAllChannel() {
    return this.client.smembersAsync([this.keyQueue]);
  }

  queueMessage(message) {
    return this.queryAllChannel().then(channels => {
      const multi = this.client.multi();
      channels.forEach(channel => multi.lpush([`${this.keyQueue}:${channel}:message`, JSON.stringify(message)]));
      return multi.execAsync();
    });
  }

}

class Channel {

  constructor(topic, channel) {
    this.topic = topic;
    this.channel = channel;
    this.keyQueue = `ftmq:topic:${this.topic}:channel:${this.channel}:message`;
    this.keyCurrent = `ftmq:topic:${this.topic}:channel:${this.channel}:current`;
    this.keyError = `ftmq:topic:${this.topic}:channel:${this.channel}:error`;
    this.client = redis.getClient();
    this.topic = new Topic(topic);
    this.topic.addChannel(channel);
  }

  getMessage(timeout) {
    // get current message
    return this.client.lindexAsync([this.keyCurrent, 0]).then(data => {
      if (data) return Promise.resolve(data);
      if (!timeout) return this.client.rpoplpushAsync([this.keyQueue, this.keyCurrent]);
      return this.client.brpoplpushAsync([this.keyQueue, this.keyCurrent, timeout]);
    });
  }

  deleteMessage() {
    return this.client.delAsync([this.keyCurrent]);
  }

  errorMessage() {
    return this.client.rpoplpushAsync([this.keyCurrent, this.keyError]);
  }

}

exports.MQ = MQ;

exports.Topic = Topic;

exports.Channel = Channel;
