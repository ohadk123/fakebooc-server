import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    _id : String,
    displayName : {
        type: String,
        required: true
    },
    profileImage : {
        type: String
    },
    password : {
        type: String,
        required: true
    },
    friends : [{
        type: Schema.Types.String, 
        ref: "User"
    }],
    friendReq : [{
        type: Schema.Types.ObjectId, 
        ref: "User"
    }]
});

export default mongoose.model("User", User);