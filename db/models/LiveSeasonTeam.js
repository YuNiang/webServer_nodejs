/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveSeasonTeam', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TeamID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    SeasonID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Exp: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Rank: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'LiveSeasonTeam',
    timestamps: true,
    paranoid: true
  });
};
