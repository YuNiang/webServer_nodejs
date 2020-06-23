/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_user_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    QQ: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    AppID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    WechatID: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    UserName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    platid: {
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
    },
    Avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    QQOpenID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    FavTeamId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    RankLevel: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    BigAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_user_info',
    timestamps: true,
    paranoid: true
  });
};
