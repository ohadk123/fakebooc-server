import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    displayName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    friends : [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    friendReq : [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }],
    posts : [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
});

export default mongoose.model("User", User);