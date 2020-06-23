/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LiveWeekUser', {
    dtEventTime: {
      type: DataTypes.DATE,
      allowNull: true
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
    Uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    FavTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RankLevel: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '1'
    },
    FlushDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'LiveWeekUser',
    timestamps: true,
    paranoid: true
  });
};
