"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  accessibility: Schema.Types.Mixed
}, {
  timestamps: true
}, {
  toJSON: {
    virtuals: true
  }
});

RoleSchema.statics.checkAccess = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, key, type, cb) {
    var item;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.findById(id);

          case 2:
            item = _context.sent;

            if (!(item && item.accessibility && item.accessibility[key] && item.accessibility[key][type])) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", true);

          case 5:
            return _context.abrupt("return", false);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = _mongoose["default"].model('Role', RoleSchema);