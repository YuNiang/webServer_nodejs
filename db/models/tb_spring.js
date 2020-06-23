/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_spring', {
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    platid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    userid: {
      type: DataTypes.STRING(48),
      allowNull: false
    }
  }, {
    tableName: 'tb_spring',
    timestamps: true,
    paranoid: true
  });
};
