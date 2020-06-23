//查询属性
exports.attributes = {

};

//动态环境变量（允许动态修改）
exports.dynamicEnvironment = [];

//短信类型
exports.sms = {
  register: {
    name: 'register',
    subject: {
      zh_CN: '注册',
      zh_TW: '注冊',
      en_US: 'Register'
    },
    activeTime: 30,
    dailyLimit: 5,
    codeLength: 6
  },
};


//queue
exports.queue = {
};

// topic
exports.topic = {
};

// message type
exports.message = {
};

//website name
exports.website = '';

exports.authorization = {
  admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImZ1bGxzdGFjayIsImV4cGlyZSI6MTkzMjg0ODY3NTk0NiwiaWF0IjoxNTcyODQ4Njc1fQ.7XYJ6q-roGm8XVh6v7pkLMaq3Ni6gSt4ay5WsShc6Q0',
};

//语言支持
exports.language = {
  default: 'zh_CN',
  notice: ['zh_CN', 'zh_TW', 'en_US'],
  message: ['zh_CN', 'zh_TW', 'en_US']
};
