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
    TeamInternalLogo: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: ''
    },
    TeamLogo: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    Exp: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    IsLPL: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    Rank: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
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
