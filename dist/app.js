"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

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
  origin: "http://wiwahub.herokuapp.com",
  // origin: "http://localhost:3000",
  credentials: true
}));

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