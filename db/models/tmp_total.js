/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmp_total', {
    Uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    total: {
      type: "DOUBLE",
      allowNull: true
    }
  }, {
    tableName: 'tmp_total',
    timestamps: true,
    paranoid: true
  });
};
