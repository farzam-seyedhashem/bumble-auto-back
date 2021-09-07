"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _blog_category_model = _interopRequireDefault(require("../models/blog_category_model"));

// Display a listing of the resource.
exports.index = function (req, res) {
  var resPerPage = parseInt(req.query.per_page) || 20;
  var page = parseInt(req.query.page) || 1;
  var response = {
    "model": _blog_category_model["default"].info(),
    "lastPageIndex": 1,
    "currentPage": page,
    "data": [],
    "perPage": resPerPage,
    "lastPage": false
  };
  var regexQuery;
  regexQuery = {};

  _blog_category_model["default"].find().skip(resPerPage * page - resPerPage).limit(resPerPage).sort({
    'createdAt': -1
  }).populate('thumbnail').exec(function (err, docs) {
    _blog_category_model["default"].count().exec(function (err, count) {
      response.lastPageIndex = count / resPerPage;

      if (count <= resPerPage * page) {
        response.lastPage = true;
      }

      response.data = docs;
      res.send(response);
    });

    console.log(docs);
    console.log(response); // prints "The author is Ian Fleming"
  });
}; // Show the form for creating a new resource.


exports.create = function (req, res) {
  res.send('NOT IMPLEMENTED: Book list');
}; // Store a newly created resource in storage.


exports.store = function (req, res) {
  var body = req.body; // console.log(body);

  var newBlogCategory = new _blog_category_model["default"]({
    title: body.title,
    slug: body.slug || body.title // like: body.like,

  });
  newBlogCategory.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(newBlogCategory);
    }
  });
}; // Display the specified resource.


exports.show = function (req, res) {
  _blog_category_model["default"].find({
    slug: req.params.slug
  }).populate('thumbnail').exec(function (err, docs) {
    res.send(docs[0]);
  });
}; // Show the form for editing the specified resource.


exports.edit = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
}; // Update the specified resource in storage.


exports.update = function (req, res) {
  var body = req.body;

  _blog_category_model["default"].findOneAndUpdate({
    slug: req.params.slug
  }, body, {
    "new": true
  }, function (err, response) {
    res.send(response);
  });
}; // Remove the specified resource from storage.


exports.destroy = function (req, res) {
  _blog_category_model["default"].remove({
    _id: req.params.id
  }, function (err, updateObj) {
    res.send(updateObj);
  });
};