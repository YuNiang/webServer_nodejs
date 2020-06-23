/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_websocket_action', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    action_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    data: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    action_status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    city_code: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'tb_websocket_action',
    timestamps: true,
    paranoid: true
  });
};
