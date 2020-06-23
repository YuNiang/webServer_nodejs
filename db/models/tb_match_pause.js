/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_pause', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Round: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'tb_match_pause',
    timestamps: true,
    paranoid: true
  });
};
