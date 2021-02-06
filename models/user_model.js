import mongoose from 'mongoose'
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const info = {
    icon: '<path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />',
    title: "کاربر",
    route: "user",
    section: [
        {
            fieldTitle: 'اطلاعات مطلب',
            fields: {
                username: {
                    title: 'نام کاربری',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: true,
                },
                password: {
                    title: 'پسورد',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: true,
                },
                email: {
                    title: 'ایمیل',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: true,
                },
            }
        },
        {
            fieldTitle: 'نقش',
            fields: {
                role: {
                    Addable:false,
                    title: 'انتخاب نقش',
                    type: 'select',
                    isMultiple: false,
                    route: 'role',
                    columnDesktop: '12',
                    columnMobile: '12',
                    key: 'name',
                    isShowInTable: false,
                },
            }
        },
    ]

}

var NewsSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
NewsSchema.static('info', function () {
    return info;
});
NewsSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User', NewsSchema);
