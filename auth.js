const rpc_auth_base = require('./rpc/authbase');

exports.register = function (plugin, options, next) {

  plugin.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET, // Secret key
    verifyOptions: {
      algorithms: ['HS256']
    },
    // Implement validation function
    validateFunc: async (decoded, request, callback) => {
      // admin
      if (!decoded.type) {
        const authorization = request.headers.authorization, service = 'DM', method = request.method.toUpperCase(), path = request.path;
        const result = await rpc_auth_base.ValidateRoute(authorization, {service, method, path});
        return callback(null, result.success);
      }

      if (decoded.type === 'admin') { return callback(null, true) } // 超级管理员

      // api
      if (decoded.type == 'api' && /^\/api\/.*/.test(request.path)) {
        // check expire
        if (decoded.expire < Date.now()) return callback(null, false);
        // check role
        if (decoded.roleId == 0) return callback(null, false);
        return callback(null, true);
      }

      return callback(null, false);
    }
  });

  plugin.auth.strategy('jwt_public', 'jwt', {
    key: process.env.JWT_SECRET, // Secret key
    verifyOptions: {
      algorithms: ['HS256']
    },
    // Implement validation function
    validateFunc: (decoded, request, callback) => {
      // api
      if (decoded.type == 'api' && /^\/api\/.*/.test(request.path)) {
        // check expire
        if (decoded.expire < Date.now()) return callback(null, false);
        return callback(null, true);
      }
      return callback(null, false);
    }
  });

  // Uncomment this to apply default auth to all routes
  //plugin.auth.default('jwt');

  next();
};

exports.register.attributes = {
  name: 'auth'
};
