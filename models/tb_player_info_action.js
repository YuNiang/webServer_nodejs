module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_player_info_action', {
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
    newTeamID: {
      type: DataTypes.INTEGER(16).UNSIGNED,
      allowNull: true
    },
    oldTeamID: {
      type: DataTypes.INTEGER(16).UNSIGNED,
      allowNull: true
    },
    newTeamGroup: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    oldTeamGroup: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    iType: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Desc: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    Step: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    IsDelete:{
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'tb_player_info_action',
    timestamps: false,
    paranoid: true
  });
};
