/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Auditorder_ext', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
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
    extOldValue: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    ext: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    AuditError: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: true
    },
    AuditReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Auditorder_ext',
    timestamps: false,
    paranoid: true
  });
};
