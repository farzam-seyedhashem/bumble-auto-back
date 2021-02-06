import mongoose from 'mongoose'

var Schema = mongoose.Schema;
const info = {
    icon: '<path fill="currentColor" d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />',
    title: "دسته بندی بلاگ",
    route: "blog-category",
    section: [
        {
            fieldTitle: 'اطلاعات دسته بندی',
            fields: {
                title: {
                    title: 'عنوان',
                    columnDesktop: '6',
                    columnMobile: '12',
                    value:"",
                    type: 'text-field',
                    isShowInTable: true,
                },
                slug: {
                    title: 'slug',
                    columnDesktop: '6',
                    columnMobile: '12',
                    value:"",
                    type: 'text-field',
                    isShowInTable: true,

                },
            }
        }
    ]
}
const BlogCategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    lang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        // default:'fa'
        // required: true,
    },
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
BlogCategorySchema.static('info', function () {
    return info;
});

module.exports = mongoose.model('BlogCategory', BlogCategorySchema);
