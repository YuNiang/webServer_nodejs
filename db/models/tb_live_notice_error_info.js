/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_live_notice_error_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Data: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NetStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_live_notice_error_info',
    timestamps: true,
    paranoid: true
  });
};
