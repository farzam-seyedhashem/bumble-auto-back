import mongoose from 'mongoose'

var Schema = mongoose.Schema;
const info = {
    icon: '<path fill="currentColor" d="M3 3V21H21V3H3M18 18H6V17H18V18M18 16H6V15H18V16M18 12H6V6H18V12Z" />',
    title: "بلاگ",
    route: "blog",
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
                    type: 'editor',
                    columnDesktop: '12',
                    columnMobile: '12',
                    isShowInTable: true,
                },
            }
        },
        {
            fieldTitle:'دسته بندی',
            fields: {
                categories: {
                    addable:true,
                    title: 'دسته بندی',
                    type: 'select',
                    isMultiple:false,
                    route: 'blog-category',
                    columnDesktop: '12',
                    columnMobile: '12',
                    key:'title',
                    isShowInTable: false,
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
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
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


module.exports = mongoose.model('Blog', NewsSchema);
