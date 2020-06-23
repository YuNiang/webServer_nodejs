/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_admin_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sUnionid: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    sOpenId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    sUserName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sUserAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dtRegister: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iRoleId: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    iTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    sSessionKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sPhone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    iStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '-1'
    },
  }, {
    tableName: 'tb_admin_info',
    timestamps: true,
    paranoid: true
  });
};
