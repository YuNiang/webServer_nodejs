module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_player_info_file', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PlayerID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    TemplateID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    ExtValue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ExpireAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_player_info_file',
    timestamps: false,
    paranoid: true
  });
};
