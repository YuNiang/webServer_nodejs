/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_ad', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    sUser: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    iPosition: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    iStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'tb_ad',
    timestamps: true,
    paranoid: true
  });
};
