import mongoose from 'mongoose'

var mongooseIntl = require('mongoose-intl')
var Schema = mongoose.Schema;
const info = {
    icon: ' <path fill="currentColor" d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" />',
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