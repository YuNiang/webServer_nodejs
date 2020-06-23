/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_daydream_vote_log', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true
    },
    DaydreamID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    PlatID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UserID: {
      type: DataTypes.STRING(48),
      allowNull: false,
      defaultValue: ''
    },
    FlowID: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    VoteNum: {
      type: DataTypes.INTEGER(12),
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
    tableName: 'tb_daydream_vote_log',
    timestamps: true,
    paranoid: true
  });
};
