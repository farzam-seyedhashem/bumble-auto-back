"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _mongooseDataSeed = require("mongoose-data-seed");

var _user_model = _interopRequireDefault(require("../models/user_model"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var bcrypt = require("bcryptjs");

var data = [{
  email: 'admin@admin.com',
  password: 'password',
  username: 'admin',
  role: '6017ac1c0d1e621ef92b656e'
}];

var UsersSeeder = /*#__PURE__*/function (_Seeder) {
  (0, _inherits2["default"])(UsersSeeder, _Seeder);

  var _super = _createSuper(UsersSeeder);

  function UsersSeeder() {
    (0, _classCallCheck2["default"])(this, UsersSeeder);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(UsersSeeder, [{
    key: "shouldRun",
    value: function () {
      var _shouldRun = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var count;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _user_model["default"].countDocuments().exec();

              case 2:
                count = _context.sent;
                return _context.abrupt("return", count === 0);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function shouldRun() {
        return _shouldRun.apply(this, arguments);
      }

      return shouldRun;
    }()
  }, {
    key: "run",
    value: function () {
      var _run = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _user_model["default"].create(data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function run() {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }]);
  return UsersSeeder;
}(_mongooseDataSeed.Seeder);

var _default = UsersSeeder;
exports["default"] = _default;