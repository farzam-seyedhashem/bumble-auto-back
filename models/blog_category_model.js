"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var info = {
  icon: '<path fill="currentColor" d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />',
  title: "Blog Category",
  route: "blog-category",
  section: [{
    fieldTitle: 'Category Info',
    fields: {
      title: {
        title: 'Title',
        columnDesktop: '6',
        columnMobile: '12',
        value: "",
        type: 'text-field',
        isShowInTable: true
      },
      slug: {
        title: 'slug',
        columnDesktop: '6',
        columnMobile: '12',
        value: "",
        type: 'text-field',
        isShowInTable: true
      }
    }
  }]
};
var BlogCategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  lang: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Language' // default:'fa'
    // required: true,

  }
}, {
  timestamps: true
}, {
  toJSON: {
    virtuals: true
  }
});
BlogCategorySchema["static"]('info', function () {
  return info;
});
module.exports = _mongoose["default"].model('BlogCategory', BlogCategorySchema);