/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveInteractEvent_201802', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    matchid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    teamid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    playerid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    userid: {
      type: DataTypes.STRING(48),
      allowNull: false
    },
    platid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    votenum: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: '0'
    },
    flowid: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'LiveInteractEvent_201802',
    timestamps: true,
    paranoid: true
  });
};
