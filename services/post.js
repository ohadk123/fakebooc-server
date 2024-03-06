import Post from "../models/post.js";
import getErrorJson from "./error.js";

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