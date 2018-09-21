"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 1337;
_app2.default.listen(PORT, function () {
  return console.log("WiwaHub Server Listening on port " + PORT + " in " + PORT + " mode");
}); // eslint-disable-line no-console
//# sourceMappingURL=index.js.map