/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveTotalTeam', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TeamID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Exp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    Rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'LiveTotalTeam',
    timestamps: true,
    paranoid: true
  });
};
