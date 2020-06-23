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
    iBo: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    Area: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'tb_match_game_rel',
    timestamps: true,
    paranoid: true
  });
};
