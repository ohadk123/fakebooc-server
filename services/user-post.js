import Post from "../models/post.js";
import getErrorJson from "./error.js";

/**
 * Adds a new post to the database
 * @param {String} uploader - Post's uploader username
 * @param {String} content - Post's text content
 * @param {Base64} contentImage - Post's image conent
 * @returns :
 * On success - The new post as it shows in the db
 * On failure -
 *      400, "Post must have some content" - If text content is null
 */
async function addPost(uploader, content, contentImage) {
    if (!content && !contentImage)
        return getErrorJson(400, ["Post must have some content"]);

    const newPost = new Post({
        uploader: uploader,
        content: content,
        contentImage: contentImage
    });

    return await newPost.save();
}

/**
 * Remove's a post from the database, only if username is the post's uploader
 * @param {String} username - Post to delete's uploader username
 * @param {Schema.Types.ObjectId} pid - Post to delete's id
 * @returns:
 * On success - The post the was deleted
 * On failure - 
 *      404, "Post not found" - If there is no post with _id=pid
 *      403, "Forbidden access" - If username is not the post's uploader
 */
async function removePost(username, pid) {
    try {
        const post = await Post.findById(pid);
        if (!post)
            return getErrorJson(404, ["Post not found"]);

        if (post.uploader !== username)
            return getErrorJson(403, ["Forbidden access"]);

        return await Post.findByIdAndDelete(pid);
    } catch (error) {
        return getErrorJson(404, ["Post not found"]);
    }
}

export default {addPost, removePost};
