/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveTotalUser', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Uid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    QQ: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    Exp: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Rank: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    FavTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RankLevel: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'LiveTotalUser',
    timestamps: true,
    paranoid: true
  });
};
