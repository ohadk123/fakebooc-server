import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

async function addPost(uploader, content, contentImage) {
    let errors = [];

    if (!content)
        errors.push("Post must have some content");

    if (errors.length > 0)
        return {errors: errors};

    const uploaderId = (await User.findById(uploader))._id;

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
        return {errors: ["Post not found"]};

    if (post.uploader !== username)
        return {errors: ["Unauthorized access"]};

    return await Post.findByIdAndDelete(pid);
}

export default {addPost, removePost};