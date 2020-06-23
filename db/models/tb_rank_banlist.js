/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_rank_banlist', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_rank_banlist',
    timestamps: true,
    paranoid: true
  });
};
