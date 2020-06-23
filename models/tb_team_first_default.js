/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_team_first_default', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sTeamName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iSup: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iJug: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iMid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iTop: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iAdc: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iCoach: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iSubCoach: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dtUpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_team_first_default',
    timestamps: false,
    paranoid: true
  });
};
