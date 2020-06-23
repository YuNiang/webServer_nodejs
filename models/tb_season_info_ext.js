module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_season_info_ext', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    extKey: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    extValue: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'tb_season_info_ext',
    timestamps: false,
    paranoid: true
  });
};
