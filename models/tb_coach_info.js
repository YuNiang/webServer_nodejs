/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_coach_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    sNickName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NameEn: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iTeamId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    iType: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    IDNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Passport: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ContractEndedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ContractStartedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AcctXiagu: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    AcctMatch: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    TrousersSize: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    CoatSize: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    TshirtSize: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    ShoesSize: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Weight: {
      type: "DOUBLE(4,2)",
      allowNull: true
    },
    iSDelete: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: true
    },
    GameName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreateOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    UpdateOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    AuditedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AuditOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    AuditStatus: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    AuditReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    VisaExpiredAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TeamGroup: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    AppearancePhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_coach_info',
    timestamps: false,
    paranoid: true
  });
};
