import Post from "../models/post.js";
import getErrorJson from "./error.js";

async function addPost(uploader, content, contentImage) {
    if (!content)
        return getErrorJson(400, "Post must have some content");

    const newPost = new Post({
        uploader: uploader,
        content: content,
        contentImage: contentImage
    });

    return await newPost.save();
}

async function removePost(username, pid) {
    const post = await Post.findById(pid);
    if (!post)
        return getErrorJson(400, "Post not found");

    if (post.uploader !== username)
        return getErrorJson(403, "Forbidden access");

    return await Post.findByIdAndDelete(pid);
}

export default {addPost, removePost};