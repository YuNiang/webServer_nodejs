/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_daydream_info', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true
    },
    MatchID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    Intro: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      defaultValue: ''
    },
    TargetScore: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      defaultValue: '0'
    },
    CurrentScore: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      defaultValue: '0'
    },
    ProgressRate: {
      type: "DOUBLE(5,2)",
      allowNull: false,
      defaultValue: '0.00'
    },
    Duration: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      defaultValue: '0'
    },
    Status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    Deadline: {
      type: DataTypes.BIGINT,
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
    tableName: 'tb_daydream_info',
    timestamps: true,
    paranoid: true
  });
};
