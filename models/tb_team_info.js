/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_team_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    TeamDes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    TeamEnDes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    TeamLogo: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    LPL: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    LDL: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DeletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_team_info',
    timestamps: true,
    paranoid: true
  });
};
