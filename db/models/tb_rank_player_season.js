/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_rank_player_season', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PlayerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    TeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PlayerRank: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PlatId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    UserId: {
      type: DataTypes.STRING(48),
      allowNull: true
    },
    UserName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Exp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    FavTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    RankLevel: {
      type: DataTypes.INTEGER(11),
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
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_rank_player_season',
    timestamps: true,
    paranoid: true
  });
};
