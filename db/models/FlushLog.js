/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FlushLog', {
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TypeDesc: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    State: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'FlushLog',
    timestamps: true,
    paranoid: true
  });
};
