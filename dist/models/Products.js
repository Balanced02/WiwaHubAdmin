'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var productsSchema = new Schema({
  sid: {
    type: String,
    required: true,
    default: _v2.default
  },
  username: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  localGovtArea: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  negotiable: {
    type: Boolean,
    required: true
  },
  premium: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  picName: {
    type: String,
    required: true
  }
});

exports.default = _mongoose2.default.model('Products', productsSchema);
//# sourceMappingURL=Products.js.map