/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    MatchLocation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    BO: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    CurrentRound: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TeamInfo: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    MatchStart: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CityCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
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
    IsOnGoing: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    CmtInfo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    dtLastModifyTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'tb_match_info',
    timestamps: true,
    paranoid: true
  });
};
