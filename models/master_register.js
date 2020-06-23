/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('master_register', {
    id: {
      type: DataTypes.INTEGER(12),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      unique: true
    },
    inviterId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    salt: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    realname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    countrycode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    idcard: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    authRequired: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    score: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    lockStatus: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    unlockAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    marketingMasterLevel: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    merchantLevel: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    creditScore: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    vipLevel: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    remarks: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    weChatId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    weChatReceiptQRCode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    aliPayId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aliPayReceiptQRCode: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    serveStart: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    serveEnd: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    servedCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    cancelledCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    baseCancelledCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    googleAuthSecret: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    googleAuthOptions: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    googleOpenId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    facebookOpenId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    twitterOpenId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    logout: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    registeredIP: {
      type: DataTypes.STRING(46),
      allowNull: true
    },
    loginedIP: {
      type: DataTypes.STRING(46),
      allowNull: true
    },
    loginedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isRoot: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    rootId: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent1Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent2Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent3Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent4Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent5Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent6Id: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    parent1Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    parent2Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    parent3Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    parent4Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    parent5Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    parent6Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level1Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level2Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level3Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level4Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level5Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level6Count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    level1Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level2Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level3Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level4Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level5Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    level6Profit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    levelProfitRates: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    totalLevelProfit: {
      type: "DOUBLE(18,8)",
      allowNull: true,
      defaultValue: '0.00000000'
    },
    bt1_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt2_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt3_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt4_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt5_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt6_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt7_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt8_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt9_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt10_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt11_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt12_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt13_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt14_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt15_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt16_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt17_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt18_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt19_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt20_balance: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt1_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt2_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt3_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt4_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt5_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt6_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt7_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt8_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt9_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt10_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt11_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt12_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt13_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt14_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt15_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt16_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt17_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt18_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt19_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt20_balance_f: {
      type: "DOUBLE(18,8)",
      allowNull: false,
      defaultValue: '0.00000000'
    },
    bt1_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt2_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt3_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt4_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt5_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt6_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt7_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt8_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt9_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt10_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt11_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt12_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt13_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt14_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt15_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt16_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt17_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt18_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt19_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt20_in_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt1_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt2_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt3_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt4_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt5_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt6_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt7_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt8_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt9_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt10_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt11_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt12_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt13_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt14_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt15_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt16_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt17_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt18_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt19_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    bt20_out_address: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'master_register',
    timestamps: true,
    paranoid: true
  });
};
