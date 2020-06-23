'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + "/gamedatabase.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var service_proto = grpc.loadPackageDefinition(packageDefinition).service;

var client = new service_proto.Service(process.env.GAME_DATA_BASE, grpc.credentials.createInsecure());

module.exports.getGameAndBOStatus = async function (matchID) {
  return new Promise((resolve, reject) => {
    client.GetGameAndBOStatus({matchID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.getOnlineGames = async function (region) {
  return new Promise((resolve, reject) => {
    client.GetOnlineGames({region:region,page:1}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.GetPlatformGameIDByBO = async function (query) {
  return new Promise((resolve, reject) => {
    client.GetPlatformGameIDByBO((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.GetBattlesBasicData = async function (query) {
  return new Promise((resolve, reject) => {
    client.GetBattlesBasicData((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.GetTeamsAndPlayersBasic = async function (query) {
  return new Promise((resolve, reject) => {
    client.GetTeamsAndPlayersBasic((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.GetGameBasicInfo = async function (query) {
  return new Promise((resolve, reject) => {
    client.GetGameBasicInfo((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.GetPlayersBasicInGame = async function (query) {
  return new Promise((resolve, reject) => {
    client.GetPlayersBasicInGame((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};
