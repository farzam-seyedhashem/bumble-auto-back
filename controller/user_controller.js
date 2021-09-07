"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user_model = _interopRequireDefault(require("../models/user_model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _slider_model = _interopRequireDefault(require("../models/slider_model"));

var _require = require("express-validator/check"),
    check = _require.check,
    validationResult = _require.validationResult;

var bcrypt = require("bcryptjs"); // Display a listing of the resource.


exports.index = function (req, res) {
  var resPerPage = parseInt(req.query.per_page) || 12;
  var page = parseInt(req.query.page) || 1;
  var category = req.query.category || "all";
  var response = {
    "model": _user_model["default"].info(),
    "currentPage": page,
    "data": [],
    "perPage": resPerPage,
    "lastPage": false,
    "lastPageIndex": 1
  };
  var regexQuery = "";

  if (category !== "all") {
    regexQuery = {
      category: new RegExp(category, 'i')
    };
  }

  _user_model["default"].find().skip(resPerPage * page - resPerPage).limit(resPerPage).sort({
    'createdAt': -1
  }).exec(function (err, docs) {
    _user_model["default"].count().exec(function (err, count) {
      response.lastPageIndex = count / resPerPage;

      if (count <= resPerPage * page) {
        response.lastPage = true;
      }

      response.data = docs;
      res.send(response);
    });
  });
}; // Show the form for creating a new resource.


exports.create = function (req, res) {
  res.send('NOT IMPLEMENTED: Book list');
}; // Store a newly created resource in storage.


exports.store = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, _req$body, username, email, password, role, user, payload;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, role = _req$body.role;
            _context.prev = 4;
            _context.next = 7;
            return _user_model["default"].findOne({
              email: email
            });

          case 7:
            user = _context.sent;

            if (!user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: "User Already Exists"
            }));

          case 10:
            console.log(role);
            user = new _user_model["default"]({
              username: username,
              email: email,
              password: password,
              role: role
            });
            user.save(function (err) {
              if (err) {
                res.send(err);
              }
            });
            payload = {
              user: {
                id: user.id,
                role: {
                  _id: role
                }
              }
            };

            _jsonwebtoken["default"].sign(payload, "randomString", {
              expiresIn: 10000
            }, function (err, token) {
              if (err) throw err;
              res.status(200).json({
                user: user,
                token: token
              });
            });

            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0.message);
            res.status(500).send("Error in Saving");

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Display the specified resource.


exports.me = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user_model["default"].findById(req.user.id).populate('role');

          case 3:
            user = _context2.sent;
            res.json(user);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.send({
              message: "Error in Fetching user"
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var errors, _req$body2, email, password, user, isMatch, payload;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = validationResult(req);

            if (errors.isEmpty()) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));

          case 3:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context3.prev = 4;
            _context3.next = 7;
            return _user_model["default"].findOne({
              email: email
            }).populate('role');

          case 7:
            user = _context3.sent;

            if (user) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "User Not Exist"
            }));

          case 10:
            _context3.next = 12;
            return bcrypt.compare(password, user.password);

          case 12:
            isMatch = _context3.sent;

            if (isMatch) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Incorrect Password !"
            }));

          case 15:
            payload = {
              user: {
                id: user.id,
                role: {
                  _id: user.role.id
                }
              }
            };
            console.log(user.role);

            _jsonwebtoken["default"].sign(payload, "randomString", {
              expiresIn: 3600
            }, function (err, token) {
              if (err) throw err;
              res.status(200).json({
                user: user,
                token: token
              });
            });

            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](4);
            console.error(_context3.t0);
            res.status(500).json({
              message: "Server Error"
            });

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 20]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Display the specified resource.


exports.show = function (req, res) {
  _user_model["default"].find({
    _id: req.params.id
  }).exec(function (err, docs) {
    console.log(docs[0]);
    res.send(docs[0]); // prints "The author is Ian Fleming"
  });
}; // Show the form for editing the specified resource.


exports.edit = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
}; // Update the specified resource in storage.


exports.update = function (req, res) {}; // Remove the specified resource from storage.


exports.destroy = function (req, res) {};