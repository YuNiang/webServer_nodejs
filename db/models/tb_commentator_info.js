/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_commentator_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    CmtDes: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CmtAvatar: {
      type: DataTypes.STRING(255),
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
    tableName: 'tb_commentator_info',
    timestamps: true,
    paranoid: true
  });
};
