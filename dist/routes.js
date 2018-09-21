"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Users = require("./models/Users");

var _Users2 = _interopRequireDefault(_Users);

var _auth = require("./controllers/auth");

var _api = require("./controllers/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
var api = (0, _express.Router)();

router.use(_express2.default.static(_path2.default.join(__dirname, "../client/build")));

var upload = (0, _multer2.default)({ dest: "./public/logos" });

// PassportJS Setup
router.use(_passport2.default.initialize());
router.use(_passport2.default.session());

var LocalStrategy = _passportLocal2.default.Strategy;
_passport2.default.use(new LocalStrategy(_Users2.default.authenticate()));
_passport2.default.serializeUser(_Users2.default.serializeUser());
_passport2.default.deserializeUser(_Users2.default.deserializeUser());

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: cfg.jwtSecret
//     },
//     function(jwtPayload, cb) {
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return Users.findOne(jwtPayload.id)
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );

//image upload temporary function

router.use("/api", api);

api.get("/me", _auth.AuthMe);
api.get("/auth/logout", _auth.Logout);
api.post("/auth/register", _auth.Register);
api.post('/auth/login', _passport2.default.authenticate('local'), _auth.Login);
// api.post("/auth/login", function(req, res, next) {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       console.log(user);
//       return res.status(400).json({
//         message: "Something is not right",
//         user: user
//       });
//     }
//     req.login(user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       }
//       // generate a signed son web token with the contents of user object and return it in the response
//       const token = jwt.sign(user.toJSON(), cfg.jwtSecret);
//       console.log("Logged In!!!");
//       return res.json({
//         user: {
//           ...user,
//           salt: undefined,
//           hash: undefined
//         },
//         token
//       });
//     });
//   })(req, res);
// });
api.use(_auth.RedirectNoAuth);

api.post('/getProducts/:id', _api.GetProducts);
api.post('/changePremium', _api.ChangePremium);

exports.default = router;
//# sourceMappingURL=routes.js.map