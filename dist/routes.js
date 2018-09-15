"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _config = require("./controllers/config");

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _Users = require("./models/Users");

var _Users2 = _interopRequireDefault(_Users);

var _auth = require("./controllers/auth");

var _api = require("./controllers/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var api = (0, _express.Router)();

var JWTStrategy = _passportJwt2.default.Strategy;
var ExtractJWT = _passportJwt2.default.ExtractJwt;

var upload = (0, _multer2.default)({ dest: "./public/logos" });

// PassportJS Setup
router.use(_passport2.default.initialize());

var LocalStrategy = _passportLocal2.default.Strategy;
_passport2.default.use(new LocalStrategy(_Users2.default.authenticate()));
_passport2.default.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config2.default.jwtSecret
}, function (jwtPayload, cb) {
  //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
  return _Users2.default.findOne(jwtPayload.id).then(function (user) {
    return cb(null, user);
  }).catch(function (err) {
    return cb(err);
  });
}));

router.use(_express2.default.static(_path2.default.join(__dirname, "../client/build")));

//image upload temporary function

router.use("/api", api);

api.get("/me", _auth.AuthMe);
api.get("/auth/logout", _auth.Logout);
api.post("/auth/register", _auth.Register);
api.post("/auth/login", function (req, res, next) {
  _passport2.default.authenticate("local", { session: false }, function (err, user, info) {
    if (err || !user) {
      console.log(user);
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
      var token = _jsonwebtoken2.default.sign(user.toJSON(), _config2.default.jwtSecret);
      console.log("Logged In!!!");
      return res.json({
        user: _extends({}, user, {
          salt: undefined,
          hash: undefined
        }),
        token: token
      });
    });
  })(req, res);
});

api.post('/getProducts/:id', _api.GetProducts);
api.post('/changePremium', _api.ChangePremium);

exports.default = router;
//# sourceMappingURL=routes.js.map