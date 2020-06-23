/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveTotalPlayer', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlayerID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    TeamID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    Rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    Exp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Lineup: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'LiveTotalPlayer',
    timestamps: true,
    paranoid: true
  });
};
