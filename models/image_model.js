"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var info = {
  title: "عکس",
  route: "gallery",
  section: [{
    fieldTitle: 'اطلاعات عکس',
    fields: {
      title: {
        title: 'عنوان',
        column: '6',
        type: 'text-field'
      },
      url: {
        title: 'لینک',
        column: '6',
        type: 'text-field'
      },
      alt: {
        title: 'alt',
        column: '6',
        type: 'text-field'
      }
    }
  }]
};
var ImageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  alt: [{
    value: {
      type: String
    },
    lang: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'Language' // required: true,

    }
  }]
}, {
  timestamps: true
}, {
  toJSON: {
    virtuals: true
  }
});
ImageSchema["static"]('info', function () {
  return info;
});
module.exports = _mongoose["default"].model('Image', ImageSchema);