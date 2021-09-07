"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;

var bcrypt = require("bcryptjs");

var info = {
  icon: '<path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />',
  title: "User Management",
  route: "user",
  section: [{
    fieldTitle: 'User Info',
    fields: {
      username: {
        title: 'Username',
        columnDesktop: '6',
        columnMobile: '12',
        type: 'text-field',
        isShowInTable: true
      },
      password: {
        title: 'Password',
        columnDesktop: '6',
        columnMobile: '12',
        type: 'text-field',
        isShowInTable: true
      },
      email: {
        title: 'Email',
        columnDesktop: '6',
        columnMobile: '12',
        type: 'text-field',
        isShowInTable: true
      }
    }
  }, {
    fieldTitle: 'Role',
    fields: {
      role: {
        Addable: false,
        title: 'Choose Role',
        type: 'select',
        isMultiple: false,
        route: 'role',
        columnDesktop: '12',
        columnMobile: '12',
        key: 'name',
        isShowInTable: false
      }
    }
  }]
};
var NewsSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Role',
    required: true
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
NewsSchema.pre('save', function (next) {
  var user = this; // only hash the password if it has been modified (or is new)

  if (!user.isModified('password')) return next(); // generate a salt

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err); // hash the password using our new salt

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err); // override the cleartext password with the hashed one

      user.password = hash;
      next();
    });
  });
});
module.exports = _mongoose["default"].model('User', NewsSchema);