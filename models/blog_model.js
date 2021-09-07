"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var info = {
  icon: '<path fill="currentColor" d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />',
  title: "Blog",
  route: "blog",
  section: [{
    fieldTitle: 'Post Info',
    fields: {
      title: {
        title: 'Title',
        columnDesktop: '6',
        columnMobile: '12',
        type: 'text-field',
        isShowInTable: true
      },
      slug: {
        title: 'Slug',
        columnDesktop: '6',
        columnMobile: '12',
        type: 'text-field',
        isShowInTable: true
      },
      thumbnail: {
        title: 'Thumbnail',
        type: 'uploader',
        columnDesktop: '12',
        columnMobile: '12'
      },
      content: {
        title: 'Content',
        column: '6',
        type: 'editor',
        columnDesktop: '12',
        columnMobile: '12',
        isShowInTable: true
      }
    }
  }, {
    fieldTitle: 'Blog Category',
    fields: {
      categories: {
        addable: true,
        title: 'Blog Category',
        type: 'select',
        isMultiple: false,
        route: 'blog-category',
        columnDesktop: '12',
        columnMobile: '12',
        key: 'title',
        isShowInTable: false
      }
    }
  }]
};
var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    unique: true,
    type: String,
    required: true
  },
  thumbnail: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Image',
    required: false
  },
  categories: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'BlogCategory',
    required: false
  },
  content: {
    type: String,
    "default": null
  },
  lang: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Language' // required: true,

  }
}, {
  timestamps: true
}, {
  toJSON: {
    virtuals: true
  }
});
NewsSchema["static"]('info', function () {
  return info;
});
module.exports = _mongoose["default"].model('Blog', NewsSchema);