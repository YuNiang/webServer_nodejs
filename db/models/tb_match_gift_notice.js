/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_gift_notice', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Round: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    GiftSerial: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    GiftTypeID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    NetStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_match_gift_notice',
    timestamps: true,
    paranoid: true
  });
};
