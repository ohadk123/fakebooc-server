import Post from "../models/post.js";
import getErrorJson from "./error.js";

/**
 * Get a list of users who liked a post
 * @param {Schema.Types.ObjectId} pid - Post id to get likes of
 * @returns :
 * On success - A list of users who liked pid
 * On failure -
 *      404, "Post not found" - If pid doesn't exist in db
 */
async function getLikes(pid) {
    try {
        const post = await Post.findById(pid);
        if (!post)
            return getErrorJson(404, ["Post not found"]);
    } catch (error) {
        return getErrorJson(404, ["Post not found"]);
    }

    return post.likes
}

/**
 * Adds username to list of likes in post
 * @param {String} username - User to like post
 * @param {Schema.Types.ObjectId} pid - post to like
 * @returns :
 * On success - The updated post
 * On failure -
 *      404, "Post not found" - If pid doesn't exist in db
 *      400, "Post already liked by [username]" - If post is already liked by username
 */
async function addLike(username, pid) {
    const post = await Post.findById(pid);
    if (!post)
        return getErrorJson(404, ["Post not found"]);

    if (post.likes.includes(username))
        return getErrorJson(400, ["Post already liked by [" + username + "]"]);

    return await Post.findByIdAndUpdate(pid, {
        $push: {
            likes: username
        }
    });
}

/**
 * removes username from list of likes in post
 * @param {String} username - User to remove like post
 * @param {Schema.Types.ObjectId} pid - post to remove like from
 * @returns :
 * On success - The updated post
 * On failure -
 *      404, "Post not found" - If pid doesn't exist in db
 *      400, "Post is not liked by [username]" - If post is not liked by username
 */
async function removeLike(username, pid) {
    const post = await Post.findById(pid);
    if (!post)
        return getErrorJson(404, ["Post not found"]);

    if (!post.likes.includes(username))
        return getErrorJson(400, ["Post is not liked by [" + username + "]"]);

    return await Post.findByIdAndUpdate(pid, {
        $pull: {
            likes: username
        }
    });
}

export default {getLikes, addLike, removeLike};