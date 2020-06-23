module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_coach_info_file', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CoachID: {
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
    tableName: 'tb_coach_info_file',
    timestamps: false,
    paranoid: true
  });
};
