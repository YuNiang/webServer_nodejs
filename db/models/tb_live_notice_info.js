/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_live_notice_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Round: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    Time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlatformID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    Method: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    NetStatus: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    IsOnGoing: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    GiftSerial: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    NoticeType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    GiftTypeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Lock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PushTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Data: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Pause: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_live_notice_info',
    timestamps: true,
    paranoid: true
  });
};
