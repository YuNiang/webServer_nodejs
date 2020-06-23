class BaseModle {
  constructor(data, message) {
    // data 需要的是对象 兼容
    if (typeof data === 'string') {
      this.message = data;
      this.data = null;
    }
    // data 需要的是对象 兼容
    if (data instanceof Error) {
      this.message = data.message;
      this.data = null;
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModle {
  constructor(data, message) {
    super(data, message);
    this.success = true;
    this.errno = 1
  }
}

class ErrorModel extends BaseModle {
  constructor(data, message) {
    super(data, message)
    this.success = false;
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
