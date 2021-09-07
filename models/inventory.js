"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var info = {
  icon: '<path fill="currentColor" d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />',
  title: "inventory",
  route: "inventory",
  section: [{
    fieldTitle: 'اطلاعات دسته بندی',
    fields: {
      title: {
        title: 'عنوان',
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
  Phone: {
    type: String // required: true,

  },
  StockNumber: {
    type: String // required: true,

  },
  VIN: {
    type: String,
    required: true
  },
  Year: {
    type: String // required: true,

  },
  Make: {
    type: String // required: true,

  },
  Model: {
    type: String // required: true,

  },
  Trim: {
    type: String // required: true,

  },
  Odometer: {
    type: String // required: true,

  },
  Price: {
    type: String // required: true,

  },
  ExteriorColor: {
    type: String // required: true,

  },
  InteriorColor: {
    type: String // required: true,

  },
  Transmission: {
    type: String // required: true,

  },
  photoURLS: [{
    type: String // ref: 'Image',

  }],
  slug: {
    type: String,
    required: true
  },
  Dealer_ID: {
    type: String,
    required: true
  },
  WebAdDescription: {
    type: String
  },
  EquipmentCode: {
    type: String
  },
  LatestPhotoModifiedDate: {
    type: String
  },
  finance: {
    type: String
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
module.exports = _mongoose["default"].model('Inventory', BlogCategorySchema);