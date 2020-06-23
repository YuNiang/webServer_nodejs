/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_match_battle_log', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Round: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Winner: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    IgameID: {
      type: "VARBINARY(50)",
      allowNull: true
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
    tableName: 'tb_match_battle_log',
    timestamps: true,
    paranoid: true
  });
};
