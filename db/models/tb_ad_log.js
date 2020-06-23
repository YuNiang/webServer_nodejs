/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_ad_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iAdid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sPlat: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iTest: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    iSuccess: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    sRst: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    iMatchId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iAdTime: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tb_ad_log',
    timestamps: true,
    paranoid: true
  });
};
