/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_team_first', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
      allowNull: false
    },
    sSide: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    iSup: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iJug: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iMid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iTop: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    iAdc: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dtUpdateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    iBo: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    }
  }, {
    tableName: 'tb_team_first',
    timestamps: true,
    paranoid: true
  });
};
