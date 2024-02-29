import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema({
    uploader : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content : {
        type: String,
        requied: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    likes : [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});

export default mongoose.model('Comment', Comment);