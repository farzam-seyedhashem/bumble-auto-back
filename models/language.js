import mongoose from 'mongoose'

var mongooseIntl = require('mongoose-intl')
var Schema = mongoose.Schema;
const info = {
    icon: '<path fill="currentColor" d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />',
    title: "زبان ها",
    route: "language",
    section: [
        {
            fieldTitle: 'اطلاعات زبان',
            fields: {
                title: {
                    title: 'عنوان',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: true,
                },
            }
        }
    ]
}
var NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
        enum: ['fa', 'en', 'ar', 'kr', 'tr'],
        default: 'fa'
    },
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    }
});
NewsSchema.static('info', function () {
    return info;
});


module.exports = mongoose.model('Language', NewsSchema);
