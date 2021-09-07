"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdb = exports.connect = exports.seedersList = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _users = _interopRequireDefault(require("./seeders/users.seeder"));

var _roles = _interopRequireDefault(require("./seeders/roles.seeder"));

var mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/bumble-auto';
/**
 * Seeders List
 * order is important
 * @type {Object}
 */

var seedersList = {
  Roles: _roles["default"],
  Users: _users["default"]
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */

exports.seedersList = seedersList;

var connect = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongoose["default"].connect(mongoURL, {
              useNewUrlParser: true
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */


exports.connect = connect;

var dropdb = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _mongoose["default"].connection.db.dropDatabase());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dropdb() {
    return _ref2.apply(this, arguments);
  };
}(); //


exports.dropdb = dropdb;