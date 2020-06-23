/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_data_more_rank', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    TeamID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Exp: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PlatformID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Verify: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    LevelDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NickName: {
      type: DataTypes.STRING(255),
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
    SumExp: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    RankLevel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'tb_data_more_rank',
    timestamps: true,
    paranoid: true
  });
};
