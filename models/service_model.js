import mongoose from 'mongoose'

var Schema = mongoose.Schema;
var mongooseIntl = require('mongoose-intl')
const info = {
    icon: '  <path fill="currentColor" d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M7.34 8.92L8.5 10.33L3.75 15.08L1 12.08L2.16 10.92L3.75 12.5L7.34 8.92" />',
    title: "خدمات",
    route: "service",
    section: [
        {
            fieldTitle:'اطلاعات خدمات',
            fields: {
                title: {
                    title: 'عنوان',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: true,
                },
                slug: {
                    title: 'slug',
                    columnDesktop: '6',
                    columnMobile: '12',
                    type: 'text-field',
                    isShowInTable: false,
                },
                thumbnail: {
                    title: 'عکس',
                    columnDesktop: '12',
                    columnMobile: '12',
                    type: 'uploader',
                    isShowInTable: false,
                },
                content: {
                    title: 'متن',
                    columnDesktop: '12',
                    columnMobile: '12',
                    type: 'editor',
                    isShowInTable: true,
                },
            },
        },
        {
            fieldTitle:'انتخاب زبان',
            fields: {
                lang: {
                    addable:true,
                    title: 'زبان',
                    type: 'select',
                    isMultiple:false,
                    route: 'language',
                    columnDesktop: '12',
                    columnMobile: '12',
                    key:'title',
                    isShowInTable: false,
                },
            }
        }

    ],
}
var ServiceSchema = new Schema({
    title: {
        // unique: true,
        type: String,
        required: true,
    },
    slug: {
        unique: true,
        type: String,
        required: true,

    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    content: {
        type: String,
        default: null,

    },
    lang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
    },
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
ServiceSchema.static('info', function () {
    return info;
});
ServiceSchema.plugin(mongooseIntl, {languages: ['fa', 'en', 'ar', 'kr', 'tr']});

module.exports = mongoose.model('Service', ServiceSchema);
