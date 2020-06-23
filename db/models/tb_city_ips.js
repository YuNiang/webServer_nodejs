/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_city_ips', {
    match_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ip_type: {
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
    tableName: 'tb_city_ips',
    timestamps: true,
    paranoid: true
  });
};
