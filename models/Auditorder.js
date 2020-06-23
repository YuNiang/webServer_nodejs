module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Auditorder', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AuditStatus: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: true
    },
    isActive: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: true
    },
    OuterID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    TeamID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    TeamGroup: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    iType: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    AuditReason: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: ''
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AuditedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AuditOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    CreateOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    AuditFilePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {
    tableName: 'Auditorder',
    timestamps: false,
    paranoid: true
  });
};
