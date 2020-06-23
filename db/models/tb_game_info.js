/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_game_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    GameName: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'tb_game_info',
    timestamps: true,
    paranoid: true
  });
};
