/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_admin_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sOpenId: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    sUserName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sUserAvatar: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    dtRegister: {
      type: DataTypes.DATE,
      allowNull: false
    },
    iRoleId: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    iTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tb_admin_info',
    timestamps: true,
    paranoid: true
  });
};
