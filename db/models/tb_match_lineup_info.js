/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_lineup_info', {
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
    PlayerInfo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    HeroInfo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    BattleID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TypeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    WorldID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Round: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Side: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    TeamID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Pov: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'tb_match_lineup_info',
    timestamps: true,
    paranoid: true
  });
};
