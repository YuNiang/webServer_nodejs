/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_route', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    route: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    interfaces: {
      type: DataTypes.STRING(10000),
      allowNull: false,
      defaultValue: ''
    },
    remark: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
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
    tableName: 'admin_route',
    timestamps: true,
    paranoid: true
  });
};
