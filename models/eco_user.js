module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eco_user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    TeamID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    UserID: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'eco_user',
    timestamps: false,
    paranoid: true
  });
};
