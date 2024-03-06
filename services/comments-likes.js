import Comment from "../models/comment.js";
import getErrorJson from "./error.js";

/**
 * Get a list of users who liked a comment
 * @param {Schema.Types.ObjectId} cid - Comment id to get likes of
 * @returns :
 * On success - A list of users who liked cid
 * On failure -
 *      404, "Comment not found" - If cid doesn't exist in db
 */
async function getLikes(cid) {
    const comment = await Comment.findById(cid);
    if (!comment)
        return getErrorJson(404, ["Comment not found"]);

    return comment.likes
}

/**
 * Adds username to list of likes in comment
 * @param {String} username - User to like comment
 * @param {Schema.Types.ObjectId} cid - comment to like
 * @returns :
 * On success - The updated comment
 * On failure -
 *      404, "Comment not found" - If cid doesn't exist in db
 *      400, "Comment already liked by [username]" - If comment is already liked by username
 */
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

/**
 * removes username from list of likes in comment
 * @param {String} username - User to remove like comment
 * @param {Schema.Types.ObjectId} cid - comment to remove like from
 * @returns :
 * On success - The updated comment
 * On failure -
 *      404, "Comment not found" - If cid doesn't exist in db
 *      400, "Comment is not liked by [username]" - If comment is not liked by username
 */
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