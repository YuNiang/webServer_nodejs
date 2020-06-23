/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_player_info_bak', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    PlayerDes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    GameName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PlayerPos: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    TeamID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    PlayerAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    PlayerEmoji: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    Exp: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Rank: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
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
    PlayerEmoji1: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    PlayerEmoji2: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    PlayerEmoji3: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    BigAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_player_info_bak',
    timestamps: true,
    paranoid: true
  });
};
