import mongoose from 'mongoose'

var Schema = mongoose.Schema;
const info = {
    icon: '<path fill="currentColor" d="M22,6V4L14,9L6,4V6L14,11L22,6M22,2A2,2 0 0,1 24,4V16A2,2 0 0,1 22,18H6C4.89,18 4,17.1 4,16V4C4,2.89 4.89,2 6,2H22M2,6V20H20V22H2A2,2 0 0,1 0,20V6H2Z" />',
    title: "درخواست ها",
    route: "request",
    section: [
        {
            fieldTitle: 'اطلاعات درخواست',
            fields: {
                name: {
                    title: 'عنوان',
                    column: '6',
                    type: 'text-field',
                },
                phoneNumber: {
                    title: 'لینک',
                    column: '6',
                    type: 'text-field',
                },
                email: {
                    title: 'alt',
                    column: '6',
                    type: 'text-field',
                },
                descr: {
                    title: 'alt',
                    column: '6',
                    type: 'text-area',
                },
            }
        }
    ]
}
var RequestSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    descr: {
        type: String,
        required: true,
    },

}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
RequestSchema.static('info', function () {
    return info;
});

module.exports = mongoose.model('Request', RequestSchema);
