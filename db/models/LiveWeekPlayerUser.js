/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveWeekPlayerUser', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    playerid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    teamid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    totalexp: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
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
      allowNull: true
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
    tableName: 'LiveWeekPlayerUser',
    timestamps: true,
    paranoid: true
  });
};
