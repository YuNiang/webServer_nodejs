/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_season_team', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    iSeasonId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dtCreate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_season_team',
    timestamps: false,
    paranoid: true
  });
};
