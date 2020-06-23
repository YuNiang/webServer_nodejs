/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_city_configIp', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    SideType: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    CityCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Position: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Ip: {
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
    tableName: 'tb_city_configIp',
    timestamps: true,
    paranoid: true
  });
};
