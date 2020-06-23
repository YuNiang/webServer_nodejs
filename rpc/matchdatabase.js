'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + "/matchdatabase.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var service_proto = grpc.loadPackageDefinition(packageDefinition).service;

var client = new service_proto.Service(process.env.MATCH_DATA_BASE, grpc.credentials.createInsecure());

module.exports.getPlayers =  async function (teamID) {
  return new Promise((resolve, reject) => {
    client.QueryPlayerByTeamID({TeamID:teamID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
}

module.exports.QuerySeason =  async function (query) {
  return new Promise((resolve, reject) => {
    client.QuerySeasonByStatus(query, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
}

module.exports.getMatchs = async function (iSeason,matchStart,teamID,cityCode,page) {
  let params = {size:10};
  if (matchStart){
    params["MatchStart"] = matchStart;
  }
  if (teamID){
    params["TeamID"] = teamID;
  }
  if (cityCode){
    params["CityCode"] = cityCode;
  }
  if (iSeason){
    params["iSeason"] = iSeason;
  }
  if(!page){
    params["page"] = 1;
  }else{
    params["page"] = page;
  }
  return new Promise((resolve, reject) => {
    client.QueryMatch(params, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};
