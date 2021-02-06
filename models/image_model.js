import mongoose from 'mongoose'

var Schema = mongoose.Schema;

const info = {
    title: "عکس",
    route: "gallery",
    section: [
        {
            fieldTitle: 'اطلاعات عکس',
            fields: {
                title: {
                    title: 'عنوان',
                    column: '6',
                    type: 'text-field',
                },
                url: {
                    title: 'لینک',
                    column: '6',
                    type: 'text-field',
                },
                alt: {
                    title: 'alt',
                    column: '6',
                    type: 'text-field',
                },
            }
        }
    ]
}
var ImageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    alt: [{
        value: {
            type: String,
        },
        lang: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Language',
            // required: true,
        },
    }],
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
ImageSchema.static('info', function () {
    return info;
});
module.exports = mongoose.model('Image', ImageSchema);
