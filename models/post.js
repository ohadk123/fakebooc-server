import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema({
    uploader : {
        type: Schema.Types.String, 
        ref: "User"
    },
    content : {
        type: String,
        required: true
    },
    contentImage : {
        type: String
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

export default mongoose.model('Post', Post);