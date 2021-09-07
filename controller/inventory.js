"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _inventory = _interopRequireDefault(require("../models/inventory"));

// Display a listing of the resource.
exports.index = function (req, res) {
  var resPerPage = parseInt(req.query.per_page) || 12;
  var page = parseInt(req.query.page) || 1;
  var response = {
    "model": _inventory["default"].info(),
    "currentPage": page,
    "data": [],
    "perPage": resPerPage,
    "lastPage": false,
    "lastPageIndex": 1
  };
  var filterObject = {};
  req.query.year ? filterObject.Year = req.query.year : '';
  req.query.make ? filterObject.Make = req.query.make : '';
  req.query.model ? filterObject.Model = req.query.model : '';
  req.query.transmission ? filterObject.Transmission = req.query.transmission : '';
  req.query.interior ? filterObject.InteriorColor = req.query.interior : '';
  req.query.exterior ? filterObject.ExteriorColor = req.query.exterior : '';
  req.query.trim ? filterObject.Trim = req.query.trim : '';

  _inventory["default"].find(filterObject).skip(resPerPage * page - resPerPage).limit(resPerPage).sort({
    'createdAt': -1
  }).exec(function (err, docs) {
    _inventory["default"].find(filterObject).count().exec(function (err, count) {
      response.lastPageIndex = Math.ceil(count / resPerPage);

      if (count <= resPerPage * page) {
        response.lastPage = true;
      }

      response.data = docs;
      res.send(response);
    });
  }); // InventoryModel.find(regexQuery, function (err, docs) {
  //
  //     response.data = docs;
  //     res.send(response);
  // })

}; // Show the form for creating a new resource.


exports.create = function (req, res) {
  res.send('NOT IMPLEMENTED: Book list');
};

exports.getAllFilter = function (req, res) {
  _inventory["default"].find({}, function (error, inventories) {
    console.log('makes');

    if (error) {
      res.send(error);
    } else {
      var years = [];
      var makes = [];
      var price = [];
      var interior = [];
      var exterior = [];
      var transmission = [];
      var trim = [];
      inventories.map(function (item) {
        years.push(item === null || item === void 0 ? void 0 : item.Year);
        makes.push(item === null || item === void 0 ? void 0 : item.Make);
        transmission.push(item === null || item === void 0 ? void 0 : item.Transmission);
        trim.push(item === null || item === void 0 ? void 0 : item.Trim);
        price.push(parseFloat(item === null || item === void 0 ? void 0 : item.Price));
        interior.push(item === null || item === void 0 ? void 0 : item.InteriorColor.replace(' ', '').toLowerCase());
        exterior.push(item === null || item === void 0 ? void 0 : item.ExteriorColor.replace(' ', '').toLowerCase());
      });
      years = (0, _toConsumableArray2["default"])(new Set(years));
      makes = (0, _toConsumableArray2["default"])(new Set(makes));
      transmission = (0, _toConsumableArray2["default"])(new Set(transmission));
      trim = (0, _toConsumableArray2["default"])(new Set(trim));
      price = price.sort();
      price = [price[price.length - 1], price[0]];
      interior = (0, _toConsumableArray2["default"])(new Set(interior));
      exterior = (0, _toConsumableArray2["default"])(new Set(exterior));
      var response = {
        years: years.sort(),
        trim: trim,
        transmission: transmission,
        makes: makes,
        price: price,
        interior: interior,
        exterior: exterior
      };
      console.log(response);
      res.send(response);
    }
  });
};

exports.getMainPageFilter = function (req, res) {
  _inventory["default"].find({}, function (error, inventories) {
    console.log('makes');

    if (error) {
      res.send(error);
    } else {
      var years = [];
      var makes = [];
      var price = [];
      var interior = [];
      inventories.map(function (item) {
        years.push(item === null || item === void 0 ? void 0 : item.Year);
        makes.push(item === null || item === void 0 ? void 0 : item.Make);
        price.push(parseFloat(item === null || item === void 0 ? void 0 : item.Price));
        interior.push(item === null || item === void 0 ? void 0 : item.InteriorColor.replace(' ', '').toLowerCase());
      });
      years = (0, _toConsumableArray2["default"])(new Set(years));
      makes = (0, _toConsumableArray2["default"])(new Set(makes));
      price = price.sort();
      console.log(price);
      price = [price[price.length - 1], price[0]];
      interior = (0, _toConsumableArray2["default"])(new Set(interior));
      var response = {
        years: years,
        makes: makes,
        price: price,
        interior: interior
      };
      console.log(response);
      res.send(response);
    }
  });
}; // Store a newly created resource in storage from CSV.


exports.storeRow = function (row) {
  row.slug = row.VIN;
  row.photoURLS = row.Photo_URLs.split(',');
  var price = parseFloat(row.Price);
  row.finance = Number((price * (.000267 * (1.000267 ^ 72) / ((1.000267 ^ 72) - 1))).toFixed(1));

  _inventory["default"].remove({}, function (err, updateObj) {
    if (err) console.log("err");else {
      new _inventory["default"](row).save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('down');
        }
      });
    }
  });
}; // Store a newly created resource in storage.


exports.store = function (req, res) {
  var body = req.body; // console.log(body);

  var newNews = new _inventory["default"]({
    Phone: body.phone,
    slug: body.slug,
    content: body.content,
    thumbnail: body.thumbnail,
    categories: body.categories,
    lang: body.lang
  });
  newNews.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(newNews);
    }
  });
}; // Display the specified resource.


exports.show = function (req, res) {
  _inventory["default"].find({
    slug: req.params.slug
  }).populate('categories').populate('thumbnail').exec(function (err, docs) {
    console.log(docs[0]);
    res.send(docs[0]);
  });
}; // Show the form for editing the specified resource.


exports.edit = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
}; // Update the specified resource in storage.


exports.update = function (req, res) {
  var body = req.body; // let doc = InventoryModel.findOneAndUpdate({_id: req.params.id}, body);

  _inventory["default"].findOneAndUpdate({
    _id: req.params.id
  }, body, {
    "new": true
  }, function (err, response) {
    res.send(response);
  });
}; // Remove the specified resource from storage.


exports.destroy = function (req, res) {
  _inventory["default"].remove({
    _id: req.params.id
  }, function (err, updateObj) {
    res.send(updateObj);
  });
};