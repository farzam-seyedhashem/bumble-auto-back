import mongoose from 'mongoose'

var Schema = mongoose.Schema;
var mongooseIntl = require('mongoose-intl')

const info = {
    icon: '<path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />',
    title: "اسلایدر",
    route: "slider",
    section: [
        {
            fieldTitle: 'اطلاعات اسلایدر',
            fields: {
                thumbnail: {
                    title: 'عکس',
                    columnDesktop: '12',
                    columnMobile: '12',
                    type: 'uploader',
                },
                title: {
                    title: 'عنوان',
                    columnDesktop: '6',
                    isShowInTable: true,
                    columnMobile: '12',
                    type: 'text-field',
                },
                buttonText: {
                    title: 'عنوان دکمه',
                    columnDesktop: '6',
                    columnMobile: '12',
                    isShowInTable: true,
                    type: 'text-field',
                },
                content: {
                    title: 'متن',
                    columnDesktop: '12',
                    columnMobile: '12',
                    type: 'text-area',
                },
            }
        },
        {
            fieldTitle: 'انتخاب زبان',
            fields: {
                lang: {
                    title: 'زبان',
                    type: 'select',
                    isMultiple: false,
                    route: 'language',
                    columnDesktop: '12',
                    columnMobile: '12',
                    key: 'title',
                    isShowInTable: false,
                },
            }
        }
    ]
}
var SliderSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    buttonText: {
        type: String,
        required: true,
    },
    content: {
        type: String,
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
SliderSchema.static('info', function () {
    return info;
});
SliderSchema.plugin(mongooseIntl, {languages: ['fa', 'en', 'ar', 'kr', 'tr']});

module.exports = mongoose.model('Slider', SliderSchema);
