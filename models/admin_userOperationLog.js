/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_userOperationLog', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    api: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    payload: {
      type: DataTypes.TEXT,
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
    }
  }, {
    tableName: 'admin_userOperationLog',
    timestamps: true,
    paranoid: true
  });
};
