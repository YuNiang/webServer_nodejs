/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_season_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    SeasonDesc: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iOpen: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'tb_season_info',
    timestamps: false,
    paranoid: true
  });
};
