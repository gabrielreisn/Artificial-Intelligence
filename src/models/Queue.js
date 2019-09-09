module.exports = class Queue {
  constructor(value = []) {
    this.value = value;
  }

  add(element) {
    return this.value.push(element);
  }

  remove() {
    return this.value.shift();
  }

  isEmpty() {
    return this.value.length > 0 ? false : true;
  }
};
