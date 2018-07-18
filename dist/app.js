"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _expressFileupload = require("express-fileupload");

var _expressFileupload2 = _interopRequireDefault(_expressFileupload);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var app = (0, _express2.default)();
app.disable("x-powered-by");

_mongoose2.default.connect(process.env.db, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log("Database Connected Successfully!");
});

_dotenv2.default.config({
  configPath: process.env.NODE_ENV === "production" ? "../config/prod" : "../config/dev"
});

app.use((0, _morgan2.default)("dev", {
  skip: function skip() {
    return app.get("env") === "test";
  }
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)({
  origin: "https://wiwahub.herokuapp.com/",
  credentials: true
}));
app.use((0, _morgan2.default)("dev"));
app.use((0, _expressFileupload2.default)());
app.use("/images", _express2.default.static(_path2.default.join(__dirname, "public")));

// app.engine('html', require('ejs').renderFile)
// app.set('view engine', 'ejs')
_cloudinary2.default.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

var uploadFile = function uploadFile(imageFile) {
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

app.post("/api/uploadFile", function (req, res, next) {
  var imageFile = req.files.file;
  uploadFile(imageFile).then(function (result) {
    return res.json({ file: result });
  }).catch(function (err) {
    return res.status(500).json({ error: err });
  });
});

// Routes
app.use("/", _routes2.default);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).send({
    error: "Error 500",
    message: "Error getting requested url"
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map