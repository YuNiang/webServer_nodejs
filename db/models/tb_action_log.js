/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_action_log', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    iUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sUserName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    sContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    }
  }, {
    tableName: 'tb_action_log',
    timestamps: true,
    paranoid: true
  });
};
