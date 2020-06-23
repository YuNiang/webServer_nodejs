/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_game_rel', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    MatchId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PlatformGameId: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iBo: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    Area: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    isValid:{
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    iWin:{
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    GameName:{
      type: DataTypes.STRING(128),
      allowNull: false
    },
    iMvp:{
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sStream:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sModifyName:{
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dtLastModifyTime:{
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_match_game_rel',
    timestamps: false,
    paranoid: true
  });
};
