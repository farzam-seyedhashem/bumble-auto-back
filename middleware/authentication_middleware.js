"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var jwt = require('jsonwebtoken');

var checkToken = function checkToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) return res.status(401).json({
    message: "Auth Error"
  });

  try {
    var decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({
      message: "Invalid Token"
    });
  }
};

exports.checkToken = checkToken;