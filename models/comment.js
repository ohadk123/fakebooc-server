import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema({
    post : {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    uploader : {
        type: Schema.Types.String,
        ref: "User"
    },
    content : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    likes : [{
        type: Schema.Types.String,
        ref: "User"
    }]
});

export default mongoose.model('Comment', Comment);