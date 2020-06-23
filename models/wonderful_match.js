module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wonderful_match', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    keyPic: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ''
    },
    status: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    flow: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    startTime: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    endTime: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    matchID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    BO: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
    },
    matchName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    platformGameID: {
      type: DataTypes.STRING(128),
      allowNull: true,
    }
  }, {
    tableName: 'wonderful_match',
    timestamps: false,
    paranoid: true
  });
};
