import Post from "../models/post.js";
import getErrorJson from "./error.js";

/**
 * Updates a post in db, changes fields content and contentImage
 * Only if they are not null
 * @param {Schema.Types.ObjectId} pid - Id of post to update
 * @param {String} newContent - New text content to update to
 * @param {Base64} newContentImage - New image content to update to
 * @returns :
 * On success - Updated post as it shows in db
 * On failure -
 *      404, "Post not found" - If the post doesn't exist in db
 */
async function updatePost(pid, newContent, newContentImage) {
    const post = await Post.findById(pid);
    if (!post)
        return getErrorJson(404, ["Post not found"]);

    let content = post.content;
    let contentImage = post.contentImage;

    if (newContent)
        content = newContent;
    if (newContentImage)
        contentImage = newContentImage;

    await Post.findByIdAndUpdate(pid, {
        content: content,
        contentImage: contentImage
    });

    return await Post.findById(pid);
}

export default {updatePost};