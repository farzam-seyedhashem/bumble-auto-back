import mongoose from 'mongoose'

var Schema = mongoose.Schema;
const info = {
    icon: ' <path fill="currentColor" d="M6,19L9,15.14L11.14,17.72L14.14,13.86L18,19H6M6,4H11V12L8.5,10.5L6,12M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2Z" />',
    title: "گالری تصاویر",
    route: "gallery",
    section: [
        {
            fieldTitle: 'اطلاعات مطلب',
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
                    isShowInTable: true,
                },
                thumbnail: {
                    title: 'عکس',
                    type: 'uploader',
                    columnDesktop: '12',
                    columnMobile: '12',
                },
                content: {
                    title: 'متن',
                    column: '6',
                    type: 'text-area',
                    columnDesktop: '12',
                    columnMobile: '12',
                    isShowInTable: true,
                },
            }
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
    ]

}
var NewsSchema = new Schema({
    title: {
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
        required: false,
    },
    content: {
        type: String,
        default: null,
    },
    lang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        // required: true,
    },
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    }
});
NewsSchema.static('info', function () {
    return info;
});


module.exports = mongoose.model('Gallery', NewsSchema);
