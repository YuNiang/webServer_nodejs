/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmp_table_team', {
    Uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    total: {
      type: "DOUBLE",
      allowNull: true
    },
    TeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tmp_table_team',
    timestamps: true,
    paranoid: true
  });
};
