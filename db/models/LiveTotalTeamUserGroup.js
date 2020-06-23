/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveTotalTeamUserGroup', {
    Uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Exp: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Rank: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RankLevel: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    UserName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PlatIds: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    TeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'LiveTotalTeamUserGroup',
    timestamps: true,
    paranoid: true
  });
};
