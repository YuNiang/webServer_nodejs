/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminname: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    idcard: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: ''
    },
    idname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'admin_user',
    timestamps: true,
    paranoid: true
  });
};
