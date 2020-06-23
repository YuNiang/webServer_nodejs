/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveTotalPlayerUser', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    playerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    teamid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    totalexp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    RankLevel: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FavTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UserRank: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'LiveTotalPlayerUser',
    timestamps: true,
    paranoid: true
  });
};
