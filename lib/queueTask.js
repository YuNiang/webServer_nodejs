
class QueueTask {

  constructor(service, max = 0) {
    if (typeof service != 'function') throw new Error('service must be a function');
    if (isNaN(max)) throw new Error('max must be a number');
    this.queue = [];
    this.status = 0;
    this.service = service;
    this.max = max;
  }

  insert(params) {
    if (this.max && this.queue.length >= this.max) return;
    this.queue.push(params);
    if (!this.status) this.handle();
    return;
  }

  handle() {
    this.status = 1;
    const params = this.queue.shift();
    return this.service(...params).then(() => {
      if (this.queue.length) return this.handle();
      this.status = 0;
      return;
    });
  }
}

exports.QueueTask = QueueTask;
