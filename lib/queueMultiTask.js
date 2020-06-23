class QueueMultiTask {

  constructor(service, size = 1) {
    if (typeof service != 'function') throw new Error('service must be a function');
    if (isNaN(size)) throw new Error('size must be a number');
    this.service = service;
    this.size = size;
    this.statusObj = {};
    this.queueObj = {};
    for (let i = 0; i < this.size; i++) {
      this.statusObj[i] = 0;
      this.queueObj[i] = [];
    }
  }

  insert(params) {
    const index = Number((Math.random() * (this.size - 1)).toFixed(0));
    this.queueObj[index].push(params);
    if (!this.statusObj[index]) this.handle(index);
    return;
  }

  handle(index) {
    this.statusObj[index] = 1;
    const params = this.queueObj[index].shift();
    return this.service(...params).then(() => {
      if (this.queueObj[index].length) return this.handle(index);
      this.statusObj[index] = 0;
      return;
    });
  }
}

exports.QueueMultiTask = QueueMultiTask;
