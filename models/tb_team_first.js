/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_team_first', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iMatchId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sTeamName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sSide: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sModifyBy: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sModifyName:{
      type: DataTypes.STRING(50),
      allowNull: true
    },
    iFirstChoose: {
      type: DataTypes.INTEGER(11),
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
    },
    dtAbortTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtPublishTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iBo: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    }
  }, {
    tableName: 'tb_team_first',
    timestamps: false,
    paranoid: true
  });
};
