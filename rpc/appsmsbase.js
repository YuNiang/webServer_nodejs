'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + "/appsmsbase.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var service_proto = grpc.loadPackageDefinition(packageDefinition).service;

var client = new service_proto.Service(process.env.APP_SMS_BASE, grpc.credentials.createInsecure());

module.exports.SendCommonMessage = async function (endpoint, endpointType, subject, message) {
  return new Promise((resolve, reject) => {
    client.SendCommonMessage({endpoint, endpointType, subject, message}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

