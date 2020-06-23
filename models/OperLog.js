module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OperLog', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Type: {
      type: DataTypes.STRING(4),
      allowNull: true,
      defaultValue: '0'
    },
    OperID: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    AuditOperID: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    OuterID: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Desc: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    OrderID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Reason: {
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    AuditedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'OperLog',
    timestamps: false,
    paranoid: true
  });
};
