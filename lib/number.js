const _ = require('lodash');

/**
 * 携带小数位数的floor
 * @param number
 * @param decimal
 * @returns {number}
 */
exports.floor = (number, decimal) => {
  return _.floor(number, decimal);
  if (isNaN(number)) throw new Error('参数（number）必须是数字');
  if (isNaN(decimal)) throw new Error('参数（decimal）必须是数字');
  decimal = parseInt(decimal);
  number = Number(number).toFixed(18);
  let index = number.indexOf('.');
  if (index < 0) return Number(number);
  if (number.length - (index + 1) <= decimal) return Number(number);
  return Number(number.substring(0, index + decimal + 1));
}

/**
 * 补全
 * @param number
 * @param length
 * @returns {string}
 */
exports.fill = (number, length) => {
  number = number.toString();
  if (number.length >= length) return number;
  let str_zero = '00000000000000000000000000';
  return str_zero.substring(0, length - number.length) + number;
}

/**
 * 随机数
 * @param start
 * @param end
 * @param decimal
 * @returns {number}
 */
exports.random = (start, end, decimal) => {
  start = Number(start);
  end = Number(end);
  decimal = Number(decimal);
  return Number(Number((Math.random() * (end - start) + start)).toFixed(decimal));
}

/**
 * 携带小数位数的ceil
 * @param number
 * @param decimal
 * @returns {number}
 */
exports.ceil = (number, decimal) => {
  return _.ceil(number, decimal);
  if (isNaN(number)) throw new Error('参数（number）必须是数字');
  if (isNaN(decimal)) throw new Error('参数（decimal）必须是数字');
  return Math.ceil(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

/**
 * 验证码
 * @param length
 * @returns {*|number}
 */
exports.code = length => {
  if (isNaN(length)) throw new Error('参数（length）必须是数字');
  if (length <= 0) throw new Error('参数（length）必须大于0');
  if (length >= 12) throw new Error('参数（length）必须小余等于12');
  const reg = new RegExp("^0\\.(\\d{" + length + "})(\\d*)");
  return Math.random().toString().replace(reg, '$1');
}

/**
 * add
 * @param num1
 * @param num2
 * @returns {number}
 */
exports.add = (num1, num2) => {
  const decimal1 = this.getDecimalDigitLength(num1);
  const decimal2 = this.getDecimalDigitLength(num2);
  const decimal = Math.pow(10, Math.max(decimal1, decimal2));
  const int1 = this.toInteger(num1) * (decimal1 > decimal2 ? 1 : Math.pow(10, Math.abs(decimal1 - decimal2)));
  const int2 = this.toInteger(num2) * (decimal1 < decimal2 ? 1 : Math.pow(10, Math.abs(decimal1 - decimal2)));
  return (int1 + int2) / decimal;
};

/**
 * sub
 * @param num1
 * @param num2
 * @returns {number}
 */
exports.sub = (num1, num2) => {
  const decimal1 = this.getDecimalDigitLength(num1);
  const decimal2 = this.getDecimalDigitLength(num2);
  const decimal = Math.pow(10, Math.max(decimal1, decimal2));
  const int1 = this.toInteger(num1) * (decimal1 > decimal2 ? 1 : Math.pow(10, Math.abs(decimal1 - decimal2)));
  const int2 = this.toInteger(num2) * (decimal1 < decimal2 ? 1 : Math.pow(10, Math.abs(decimal1 - decimal2)));
  return (int1 - int2) / decimal;
};

/**
 * multi
 * @param num1
 * @param num2
 * @returns {number}
 */
exports.multi = (num1, num2) => {
  const decimal1 = this.getDecimalDigitLength(num1);
  const decimal2 = this.getDecimalDigitLength(num2);
  const decimal = decimal1 + decimal2;
  const int1 = this.toInteger(num1);
  const int2 = this.toInteger(num2);
  return int1 * int2 / Math.pow(10, decimal);

};

/**
 * div
 * @param num1
 * @param num2
 * @returns {number}
 */
exports.div = (num1, num2) => {
  const decimal1 = this.getDecimalDigitLength(num1);
  const decimal2 = this.getDecimalDigitLength(num2);
  const decimal = decimal2 - decimal1;
  const int1 = this.toInteger(num1);
  const int2 = this.toInteger(num2);
  return int1 / int2 * Math.pow(10, decimal);
};

/**
 * get decimal digit length
 * @param number
 * @returns {number}
 */
exports.getDecimalDigitLength = number => {
  if (isNaN(number)) throw new Error('number must be a number');
  let length = 0;
  const str = number.toString();
  if (/e-/.test(str)) {
    const str_front = str.replace(/(.*)e-\d/, '$1');
    const str_back = str.replace(/.*e-(\d)/, '$1');
    const array_front = str_front.split('.');
    const length_front = array_front[1] ? array_front[1].length : 0;
    length = length_front + str_back / 1;
  } else if (/\./.test(str)) {
    const array_front = str.split('.');
    length = array_front[1] ? array_front[1].length : 0;
  }
  return length;
}

/**
 * to integer
 * @param number
 * @returns {number}
 */
exports.toInteger = number => {
  if (isNaN(number)) throw new Error('number must be a number');
  const str = number.toString();
  let result;
  if (/e-/.test(str)) {
    const front = str.replace(/(\d)(e-)(\d)/, '$1');
    return this.toInteger(front);
  } else if (/\./.test(str)) {
    result = str.replace(/(\d)(\.)(\d)/, '$1$3');
  }
  return result ? Number(result) : number;
}
