/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_player_info', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IDNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Passport: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    NameCn: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NameEn: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ContractStartedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ContractEndedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PlayerDes: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    GameName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PlayerPos: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    TeamID: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true,
      defaultValue: '0'
    },
    PlayerAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
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
    },
    BigAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    VisaExpiredAt: {
      type: DataTypes.STRING(64),
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
    KbType: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    KbDriver: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    MouseType: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    TrousersSize: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    ShoesSize: {
      type: DataTypes.STRING(64),
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
    Weight: {
      type: "DOUBLE(4,2)",
      allowNull: true
    },
    PlayerRole: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    IsMouseDriven: {
      type: DataTypes.INTEGER(2),
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
    AuditOperID: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    AuditedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }, 
    UserType: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    }, 
    AuditStatus: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    },
    AuditReason: {
      type: DataTypes.STRING(255),
      allowNull: true
    }, 
    IsDelete: {
      type: DataTypes.INTEGER(2).UNSIGNED,
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
    ActionType: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: true
    },
    PlayingAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AppearancePhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tb_player_info',
    timestamps: false,
    paranoid: true
  });
};
