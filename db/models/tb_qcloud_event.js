/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_qcloud_event', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Round: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    eventType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    time: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    teamName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    nextDrake: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    competitorID: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    IsPush: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    Lock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    team: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    giftTypeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_qcloud_event',
    timestamps: true,
    paranoid: true
  });
};
