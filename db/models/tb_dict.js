/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_dict', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Value: {
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
    tableName: 'tb_dict',
    timestamps: true,
    paranoid: true
  });
};
