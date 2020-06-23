/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveDailyData', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    MatchId: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    PlatId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UserId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    TeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PlayerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    VoteNum: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    VoteCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    FreeNum: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    FreeCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'LiveDailyData',
    timestamps: true,
    paranoid: true
  });
};
