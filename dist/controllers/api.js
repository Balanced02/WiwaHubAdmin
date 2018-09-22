"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetSummary = exports.MyAds = exports.DeleteProduct = exports.GetProducts = exports.CreateProduct = exports.ChangePremium = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _regeneratorRuntime = require("regenerator-runtime");

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _Products = require("../models/Products");

var _Products2 = _interopRequireDefault(_Products);

var _Users = require("../models/Users");

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ChangePremium = exports.ChangePremium = function ChangePremium(req, res) {
  var id = req.body._id;
  var premium = req.body;
  _Products2.default.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      premium: !premium.premium
    }
  }, {
    new: true
  }).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.status(500).json({
      message: err.message
    });
  });
};

var CreateProduct = exports.CreateProduct = function CreateProduct(req, res, result) {
  var url = result.url,
      public_id = result.public_id;

  var user = req.user;

  var _JSON$parse = JSON.parse(req.body.data),
      title = _JSON$parse.title,
      state = _JSON$parse.state,
      localGovtArea = _JSON$parse.localGovtArea,
      price = _JSON$parse.price,
      negotiable = _JSON$parse.negotiable;

  var productDetails = {
    title: title,
    state: state,
    localGovtArea: localGovtArea,
    price: price,
    negotiable: negotiable,
    product: url,
    picName: public_id
  };
  _Products2.default.create(_extends({}, productDetails, { username: user.sid })).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({ err: err, message: err.message });
  });
};

var GetProducts = exports.GetProducts = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee(req, res) {
    var page, searchKey, searchQuery, search, _ref2, _ref3, count, products, username;

    return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = parseInt(Number(req.params.id));
            searchKey = req.body.searchKey;
            searchQuery = {};

            if (searchKey) {
              search = {
                $regex: searchKey || "",
                $options: "i"
              };

              searchQuery = {
                $or: [{
                  sid: search
                }, {
                  product: search
                }, {
                  state: search
                }, {
                  localGovtArea: search
                }, {
                  title: search
                }]
              };
            }
            if (!page) {
              page = 1;
            }
            _context.prev = 5;
            _context.next = 8;
            return Promise.all([_Products2.default.find(searchQuery).count(), _Products2.default.find(searchQuery).sort("created").skip(page * 25 - 25).limit(25)]);

          case 8:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            count = _ref3[0];
            products = _ref3[1];
            _context.next = 14;
            return _Users2.default.find({
              sid: {
                $in: products.map(function (product) {
                  return product.username;
                })
              }
            }, "username phoneNumber sid");

          case 14:
            username = _context.sent;

            products = products.map(function (product) {
              var userName = username.filter(function (user) {
                return user.sid === product.username;
              })[0];
              product._doc.username = userName ? userName.username : "";
              product._doc.phoneNumber = userName ? userName.phoneNumber : "";
              return product;
            });

            return _context.abrupt("return", res.json({
              count: count,
              products: products
            }));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](5);

            console.log(_context.t0);
            res.status(500).json({
              message: "Error Loading Product List",
              error: _context.t0.message
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 19]]);
  }));

  return function GetProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var DeleteProduct = exports.DeleteProduct = function DeleteProduct(req, res, result) {
  console.log(result);
  var _id = req.params.id;
  _Products2.default.findOneAndRemove({ _id: _id }).then(function (data) {
    return res.json({
      message: "Deleted Successfully"
    });
  }).catch(function (err) {
    res.status(500).json({
      message: "Unable to delete Product",
      error: err.message
    });
  });
};

var MyAds = exports.MyAds = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2(req, res) {
    var page, searchKey, sid, searchQuery, search, _ref5, _ref6, count, products, username;

    return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = parseInt(Number(req.params.id));
            searchKey = req.body.searchKey;
            sid = req.user.sid;
            searchQuery = { username: sid };

            if (searchKey) {
              search = {
                $regex: searchKey || "",
                $options: "i"
              };

              searchQuery.$or = [{
                sid: search
              }, {
                product: search
              }, {
                state: search
              }, {
                localGovtArea: search
              }, {
                title: search
              }];
            }

            if (!page) {
              page = 1;
            }
            _context2.prev = 6;
            _context2.next = 9;
            return Promise.all([_Products2.default.find(searchQuery).count(), _Products2.default.find(searchQuery).sort("created")]);

          case 9:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            count = _ref6[0];
            products = _ref6[1];
            _context2.next = 15;
            return _Users2.default.find({
              sid: {
                $in: products.map(function (product) {
                  return product.username;
                })
              }
            }, "username phoneNumber sid");

          case 15:
            username = _context2.sent;

            products = products.map(function (product) {
              var userName = username.filter(function (user) {
                return user.sid === product.username;
              })[0];
              product._doc.username = userName ? userName.username : "";
              product._doc.phoneNumber = userName ? userName.phoneNumber : "";
              return product;
            });

            return _context2.abrupt("return", res.json({
              count: count,
              products: products
            }));

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](6);

            console.log(_context2.t0);
            res.status(500).json({
              message: "Error Loading Product List",
              error: _context2.t0.message
            });

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[6, 20]]);
  }));

  return function MyAds(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

var GetSummary = exports.GetSummary = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3(req, res) {
    var oneday, search, _ref8, _ref9, availableProducts, lastWeekCount, usersCount, myAdsCount;

    return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            oneday = 8.64e7;
            search = {
              $lt: new Date(Date.now() - 7 * oneday).toString()
            };
            _context3.prev = 2;
            _context3.next = 5;
            return Promise.all([_Products2.default.find().count(), _Products2.default.find({ created: search }).count(), _Users2.default.find().count(), _Products2.default.find({ username: req.user.sid }).count()]);

          case 5:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 4);
            availableProducts = _ref9[0];
            lastWeekCount = _ref9[1];
            usersCount = _ref9[2];
            myAdsCount = _ref9[3];
            return _context3.abrupt("return", res.json({
              availableProducts: availableProducts, lastWeekCount: lastWeekCount, usersCount: usersCount, myAdsCount: myAdsCount
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);

            console.log(_context3.t0);
            res.status(500).json({
              message: "Error Getting Summary Data",
              error: _context3.t0.message
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 14]]);
  }));

  return function GetSummary(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}();
//# sourceMappingURL=api.js.map