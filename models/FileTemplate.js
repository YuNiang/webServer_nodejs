module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FileTemplate', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iType: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    sFilePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sDesc: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    sDemoFilePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true
    },
    isActive: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: true
    },
    isNeed: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    }
  }, {
    tableName: 'FileTemplate',
    timestamps: false,
    paranoid: true
  });
};
