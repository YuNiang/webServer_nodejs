/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_web_log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ActionName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    Message: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    CityId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    MatchID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    Result: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    TypeColor: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
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
    tableName: 'tb_web_log',
    timestamps: true,
    paranoid: true
  });
};
