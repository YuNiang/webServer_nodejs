/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveWeekTeamUser', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
    createdat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'LiveWeekTeamUser',
    timestamps: true,
    paranoid: true
  });
};
