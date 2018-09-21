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

var _connectMongo = require("connect-mongo");

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./controllers/config");

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Users = require("./models/Users");

var _Users2 = _interopRequireDefault(_Users);

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _auth = require("./controllers/auth");

var _api = require("./controllers/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

_dotenv2.default.config({
  configPath: process.env.NODE_ENV === "production" ? "../config/prod" : "../config/dev"
});

var router = (0, _express.Router)();
var api = (0, _express.Router)();

router.use(_express2.default.static(_path2.default.join(__dirname, "../client/build")));

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
router.use((0, _cookieParser2.default)());
router.use((0, _expressSession2.default)({
  secret: process.env.SESSION_SECRET || 'unkn0wn wiwahub s3Cret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3.6e6 // 1 Hour session
  },
  store: new MongoStore({
    mongooseConnection: _mongoose2.default.connection
  })
}));

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

api.use((0, _morgan2.default)("dev"));
api.use((0, _expressFileupload2.default)());
api.use("/images", _express2.default.static(_path2.default.join(__dirname, "../client/public")));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')
_cloudinary2.default.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

var uploadFile = function uploadFile(imageFile) {
  _fs2.default.readdir(_path2.default.join(__dirname, "public"), function (err, files) {
    if (err) {
      console.log(err);
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var file = _step.value;

        _fs2.default.unlink(_path2.default.join(_path2.default.join(__dirname, 'public'), file), function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return new Promise(function (resolve, reject) {
    var newFilename = (0, _v2.default)();
    imageFile.mv(__dirname + "/public/" + newFilename + "-" + imageFile.name, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      _cloudinary2.default.uploader.upload(__dirname + "/public/" + newFilename + "-" + imageFile.name, function (result) {
        resolve(result);
      });
    });
  });
};

var deleteImage = function deleteImage(public_id) {
  return new Promise(function (resolve, reject) {
    _cloudinary2.default.uploader.destroy(public_id, function (err, result) {
      resolve(result);
    });
  });
};

api.post('/api/deleteProduct/:id', function (req, res) {
  var public_id = req.body.picName;
  deleteImage(public_id).then(function (result) {
    return (0, _api.DeleteProduct)(req, res, result);
  }).catch(function (err) {
    return res.status(500).json({ error: err });
  });
});

api.post('/getProducts/:id', _api.GetProducts);
api.post('/changePremium', _api.ChangePremium);
api.post("/createProduct", function (req, res) {
  var user = req.user;
  console.log(user);
  var imageFile = req.files.file;
  uploadFile(imageFile).then(function (result) {
    return (0, _api.CreateProduct)(req, res, result);
  }).catch(function (err) {
    return res.status(500).json({ error: err });
  });
});
exports.default = router;
//# sourceMappingURL=routes.js.map