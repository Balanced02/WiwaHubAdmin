'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

var _http = require('http');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var usersSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  username: {
    type: String,
    trim: true,
    unique: true
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'user'
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

usersSchema.plugin(_passportLocalMongoose2.default);

exports.default = _mongoose2.default.model('Users', usersSchema);
//# sourceMappingURL=Users.js.map