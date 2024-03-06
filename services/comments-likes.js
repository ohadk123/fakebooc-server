import Comment from "../models/comment.js";
import getErrorJson from "./error.js";

async function getLikes(cid) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    return comment.likes
}

async function addLike(username, cid) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    if (comment.likes.includes(username))
        return getErrorJson(400, ["Comment already liked by [" + username + "]"]);

    return await Comment.findByIdAndUpdate(cid, {
        $push: {
            likes: username
        }
    });
}

async function removeLike(username, cid) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    if (!comment.likes.includes(username))
        return getErrorJson(400, ["Comment is not liked by [" + username + "]"]);

    return await Comment.findByIdAndUpdate(cid, {
        $pull: {
            likes: username
        }
    });
}

export default {getLikes, addLike, removeLike};