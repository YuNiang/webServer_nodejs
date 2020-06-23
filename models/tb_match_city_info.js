/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_city_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    CityCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    Desc: {
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
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    LinkStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    GuardLinkStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    TeamA: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    TeamB: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    IsSendEmoji: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tb_match_city_info',
    timestamps: true,
    paranoid: true
  });
};
