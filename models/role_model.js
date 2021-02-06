import mongoose from 'mongoose'

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    accessibility: Schema.Types.Mixed
}, {timestamps: true}, {
    toJSON: {
        virtuals: true,
    },
});
RoleSchema.statics.checkAccess = async function (id, key, type, cb) {
    const item = await this.findById(id);
    // console.log(item.accessibility)
    if (item && item.accessibility && item.accessibility[key] && item.accessibility[key][type]) {
        return true;
    }
    return false;
}
module.exports = mongoose.model('Role', RoleSchema);
