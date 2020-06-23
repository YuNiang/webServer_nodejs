'use strict';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(__dirname + "/authbase.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

var authBaseProto = grpc.loadPackageDefinition(packageDefinition).service;

var client = new authBaseProto.Service(process.env.AUTH_BASE, grpc.credentials.createInsecure());

module.exports.client = client;

module.exports.QueryRouteByID = async function (id) {
  return new Promise((resolve, reject) => {
    client.QueryRouteByID({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryAllRouteService = async function () {
  return new Promise((resolve, reject) => {
    client.QueryAllRouteService({}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryAllRoute = async function (services) {
  return new Promise((resolve, reject) => {
    client.QueryAllRoute({services}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryRoute = async function (page, size, order, services) {
  return new Promise((resolve, reject) => {
    client.QueryRoute({page, size, order, services}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveRoute = async function (service, method, path, remark) {
  return new Promise((resolve, reject) => {
    client.SaveRoute({service, method, path, remark}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateRoute = async function (id, service, method, path, remark) {
  return new Promise((resolve, reject) => {
    client.UpdateRoute({id, service, method, path, remark}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteRoute = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteRoute({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryRoleByID = async function (id) {
  return new Promise((resolve, reject) => {
    client.QueryRoleByID({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryAllRole = async function () {
  return new Promise((resolve, reject) => {
    client.QueryAllRole({}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryRole = async function (page, size, order) {
  return new Promise((resolve, reject) => {
    client.QueryRole({page, size, order}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveRole = async function (name, code, remark) {
  return new Promise((resolve, reject) => {
    client.SaveRole({name, code, remark}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateRole = async function (id, name, code, remark) {
  return new Promise((resolve, reject) => {
    client.UpdateRole({id, name, code, remark}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteRole = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteRole({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryRoleRouteByRoleID = async function (roleID) {
  return new Promise((resolve, reject) => {
    client.QueryRoleRouteByRoleID({roleID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveRoleRoute = async function (roleID, routeID, routeFilter) {
  return new Promise((resolve, reject) => {
    client.SaveRoleRoute({roleID, routeID, routeFilter}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateRoleRoute = async function (id, roleID, routeID, routeFilter) {
  return new Promise((resolve, reject) => {
    client.UpdateRoleRoute({id, roleID, routeID, routeFilter}, function (err, response) {
      if (err) {
        return reject(err);
      }
      response.data.id = id;
      resolve(response);
    });
  });
};

module.exports.DeleteRoleRoute = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteRoleRoute({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryAppByID = async function (id) {
  return new Promise((resolve, reject) => {
    client.QueryAppByID({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryApp = async function (page, size, order) {
  return new Promise((resolve, reject) => {
    client.QueryApp({page, size, order}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveApp = async function (name, email, remark, expiredAt) {
  return new Promise((resolve, reject) => {
    client.SaveApp({name, email, remark, expiredAt}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateApp = async function (id, name, email, remark, expiredAt) {
  return new Promise((resolve, reject) => {
    client.UpdateApp({id, name, email, remark, expiredAt}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteApp = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteApp({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryAppRoleByAppID = async function (appID) {
  return new Promise((resolve, reject) => {
    client.QueryAppRoleByAppID({appID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveAppRole = async function (appID, roleID) {
  return new Promise((resolve, reject) => {
    client.SaveAppRole({appID, roleID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateAppRole = async function (id, appID, roleID) {
  return new Promise((resolve, reject) => {
    client.UpdateAppRole({id, appID, roleID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteAppRole = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteAppRole({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryUserByID = async function (id) {
  return new Promise((resolve, reject) => {
    client.QueryUserByID({id: Number(id)}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryUser = async function (page, size, order, search) {
  return new Promise((resolve, reject) => {
    client.QueryUser({page, size, order, search}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveEcoUser = async function (query) {
  return new Promise((resolve, reject) => {
    client.SaveUser((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryUserByRoleID = async function (query) {
  return new Promise((resolve, reject) => {
    client.QueryUserByRoleID((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveUser = async function (phone, areaCode, weChatUnionID, email, nickname, IDNumber, IDName) {
  return new Promise((resolve, reject) => {
    client.SaveUser({phone, areaCode, weChatUnionID, email, nickname, IDNumber, IDName}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateEcoUser = async function (query) {
  return new Promise((resolve, reject) => {
    client.UpdateUser(query, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateUser = async function (id, phone, areaCode, weChatUnionID, email, nickname, IDNumber, IDName) {
  return new Promise((resolve, reject) => {
    client.UpdateUser({id, phone, areaCode, weChatUnionID, email, nickname, IDNumber, IDName}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteUser = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteUser({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.QueryUserRoleByUserID = async function (userID) {
  return new Promise((resolve, reject) => {
    client.QueryUserRoleByUserID({userID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.SaveUserRole = async function (userID, roleID) {
  return new Promise((resolve, reject) => {
    client.SaveUserRole({userID: Number(userID), roleID: Number(roleID)}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateUserRole = async function (id, userID, roleID) {
  return new Promise((resolve, reject) => {
    client.UpdateUserRole({id, userID, roleID}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteUserRole = async function (id) {
  return new Promise((resolve, reject) => {
    client.DeleteUserRole({id}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.DeleteUserRoleByUserIDAndRoleID = async function (query) {
  return new Promise((resolve, reject) => {
    client.DeleteUserRoleByUserIDAndRoleID(query, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};


module.exports.LoginByWeChat = async function (code) {
  return new Promise((resolve, reject) => {
    client.LoginByWeChat({code}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.ValidateRoute = async function (authorization, authRoute) {
  return new Promise((resolve, reject) => {
    client.ValidateRoute({authorization, authRoute}, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

module.exports.UpdateJWTPayload = async function (query) {
  return new Promise((resolve, reject) => {
    client.UpdateJWTPayload((query), function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};

