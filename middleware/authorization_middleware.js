"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = permit;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _role_model = _interopRequireDefault(require("../models/role_model"));

function permit() {
  for (var _len = arguments.length, modelName = new Array(_len), _key = 0; _key < _len; _key++) {
    modelName[_key] = arguments[_key];
  }

  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
      var user, method, type;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = request.user, method = request.method;
              type = method.toLowerCase();

              if (type === 'get' && Object.keys(request.params).length !== 0) {
                type = 'show';
              }

              _context.t0 = console;
              _context.next = 6;
              return _role_model["default"].checkAccess(user.role._id, modelName, type);

            case 6:
              _context.t1 = _context.sent;

              _context.t0.log.call(_context.t0, _context.t1);

              _context.t2 = user && user.role && user.role._id;

              if (!_context.t2) {
                _context.next = 13;
                break;
              }

              _context.next = 12;
              return _role_model["default"].checkAccess(user.role._id, modelName, type);

            case 12:
              _context.t2 = _context.sent;

            case 13:
              if (!_context.t2) {
                _context.next = 17;
                break;
              }

              next();
              _context.next = 19;
              break;

            case 17:
              console.log(_role_model["default"].checkAccess(user.role._id, modelName, type));
              response.status(403).send({
                message: "Forbidden"
              }); // user is forbidden

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
}