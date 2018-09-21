"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logout = exports.RedirectNoAuth = exports.AuthMe = exports.Login = exports.Register = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _regeneratorRuntime = require("regenerator-runtime");

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _Users = require("../models/Users");

var _Users2 = _interopRequireDefault(_Users);

var _path = require("path");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Register = exports.Register = function Register(req, res) {
  var user = JSON.parse(req.headers.user);
  userRegister(req.body).then(function (user) {
    return res.json({
      message: "Registered Successfully",
      user: _extends({}, user)
    });
  }).catch(function (err) {
    return res.status(400).json({
      message: err.message
    });
  });
};

var userRegister = function userRegister(body, user) {
  var type = body.userType;
  var newUser = new _Users2.default(_extends({}, body, {
    userType: type
  }));

  return new Promise(function (resolve, reject) {
    _Users2.default.register(newUser, body.password, function (err, user) {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
};

var Login = exports.Login = function Login(req, res) {
  _passport2.default.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, function (err) {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      var token = _jsonwebtoken2.default.sign(user, _config2.default.jwtSecret);
      return res.json({ user: user, token: token });
    });
  });
};

// Get user data from client side
var AuthMe = exports.AuthMe = function AuthMe(req, res) {
  var user = JSON.parse(req.headers.user);
  var token = req.headers.token;
  if (user.username && token) {
    return res.json({
      authenticated: true,
      user: user
    });
  }
  return res.redirect('/login').json({
    authenticated: false
  });
};

// Auth Middleware
var RedirectNoAuth = exports.RedirectNoAuth = function RedirectNoAuth(req, res, next) {
  var user = JSON.parse(req.headers.user);
  if (!user) {
    return res.redirect("/whatever");
  }
  return next();
};

var Logout = exports.Logout = function Logout(req, res) {
  req.logout();
  res.json({
    message: "Logout"
  });
};
//# sourceMappingURL=auth.js.map