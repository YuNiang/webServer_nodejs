'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + "/userbase.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var userbase_proto = grpc.loadPackageDefinition(packageDefinition).service;

var client = new userbase_proto.UserBaseService(process.env.APP_USER_BASE, grpc.credentials.createInsecure());

module.exports.login = async function (code) {
  return new Promise((resolve, reject) => {
    client.Login({
      plat: "wx",
      code: code,
      appid: "wx5784540e81bf9e8f",
      redirect: "https%3a%2f%2fvip.tjstats.com%2fwx_login",
      ltype: "server",
      business:"lpladmin",
      serial: "node-admin-" + Date.now()
    }, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

// this.login("061fdajA1sHLMc0kLejA1tocjA1fdajC").then(data=>{console.log(data)}).catch(err=>{console.log(err)});
