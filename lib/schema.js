const fs = require('fs');

const typeConfig = {
  string: ['CHAR', 'VARCHAR', 'TINYBLOB', 'BLOB', 'TEXT', 'MEDIUMBLOB', 'MEDIUMTEXT', 'LONGBLOB', 'LONGTEXT'],
  integer: ['TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT'],
  double: ['FLOAT', 'DOUBLE', 'DECIMAL'],
  date: ['DATE', 'TIME', 'YEAR', 'DATETIME', 'TIMESTAMP'],
};

const getType = field => {
  const type = field.Type.replace(/(.*)(\(.*\))/, '$1').toUpperCase();
  if (typeConfig.string.indexOf(type) != -1) return 'string';
  if (typeConfig.integer.indexOf(type) != -1) return 'integer';
  if (typeConfig.double.indexOf(type) != -1) return 'double';
  if (typeConfig.date.indexOf(type) != -1) return 'date';
  return 'any';
};

const getMeta = field => {

  const type = getType(field);
  const {Field, Type, Null, Default, Comment} = field;
  let str = 'Joi';

  if (type == 'string') {
    str += '.string()';
    const max = Type.match(/\d+/g) ? Type.match(/\d+/g)[0] : null;
    if (max) str += `.max(${max})`;
  }
  if (type == 'integer') {
    str += '.number().integer()';
  }
  if (type == 'double') {
    str += '.number()';
    const precision = Type.match(/\d+/g) ? Type.match(/\d+/g)[1] : null;
    if (precision) str += `.precision(${precision})`;
  }
  if (type == 'date') {
    str += '.date()';
  }
  str += Null == 'NO' ? ('.invalid(null)' + (type == 'string' ? '.allow(\'\')' : '')) : '.allow(null)';
  if (Default) str += `.default(${isNaN(Default) ? `'${Default}'` : Default})`;
  if (Comment) str += `.description('${Comment}')`;

  return `${Field}: ${str}`;
};

/**
 * handle
 * @param table
 * @returns {Promise.<TResult>|*|Request}
 */
exports.handle = table => {

  // query fields info
  return Sequelize.query(`show full fields from \`${table}\``, {type: Sequelize.QueryTypes.SELECT}).then(fields => {

    const rawStr =  `Joi.object({
  ${fields.map(item => getMeta(item)).join(',\n  ')}
})`;

    const content = `
const Joi = require('joi');

// schema
const schema = ${rawStr}.unknown();

// list
exports.list = Joi.object({
  count: Joi.number().integer(),
  rows: Joi.array().items(schema)
});

// detail
exports.detail = schema;
`;

    fs.writeFileSync(`schemas/${table}.js`, content);

    return table;

  });
};

/**
 * generate
 * @returns {Promise.<*>}
 */
exports.generate = () => {

  // query tables
  return Sequelize.query(`show tables`, {type: Sequelize.QueryTypes.SELECT}).then(data => {
    const task = [];
    data.forEach(item => task.push(this.handle(item[`Tables_in_${process.env.DB_DBNAME}`])));
    return Promise.all(task);
  })
};
