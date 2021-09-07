"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _image_model = _interopRequireDefault(require("../models/image_model"));

var uploadFile = require("../middleware/upload");

var fs = require("fs");

var baseUrl = "http://localhost:8080/files/"; // Display a listing of the resource.

var index = function index(req, res) {
  var resPerPage = parseInt(req.query.per_page) || 12;
  var page = parseInt(req.query.page) || 1;
  var category = req.query.category || "all";
  var response = {
    "model": _image_model["default"].info(),
    "currentPage": page,
    "data": [],
    "perPage": resPerPage,
    "lastPage": false,
    "lastPageIndex": 1
  };
  var regexQuery = {};

  _image_model["default"].find().skip(resPerPage * page - resPerPage).limit(resPerPage).sort({
    'createdAt': -1
  }).exec(function (err, docs) {
    _image_model["default"].count().exec(function (err, count) {
      response.lastPageIndex = Math.ceil(count / resPerPage);

      if (count <= resPerPage * page) {
        response.lastPage = true;
      }

      response.data = docs;
      res.send(response);
    });
  });
};

var upload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var image;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return uploadFile(req, res);

          case 3:
            if (!(req.file == undefined)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Please upload a file!"
            }));

          case 7:
            console.log(req);
            image = new _image_model["default"]({
              title: req.file.originalname,
              url: '/images/' + req.file.originalname,
              alt: {
                value: req.body.alt,
                lang: req.body.lang
              } // like: body.like,

            });
            image.save(function (err) {
              if (err) {
                res.send(err);
              } else {
                res.status(200).send(image);
              }
            });

          case 10:
            _context.next = 18;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

            if (!(_context.t0.code == "LIMIT_FILE_SIZE")) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(500).send({
              message: "File size cannot be larger than 2MB!"
            }));

          case 17:
            res.status(500).send({
              message: "Could not upload the file: ".concat(req.file.originalname, ". ").concat(_context.t0)
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var destroy = function destroy(req, res) {
  // ./public/images/
  _image_model["default"].remove({
    _id: req.params.id
  }, function (err, updateObj) {
    res.send(updateObj);
  });
};

module.exports = {
  upload: upload,
  index: index,
  destroy: destroy
};