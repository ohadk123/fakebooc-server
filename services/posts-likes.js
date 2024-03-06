import Post from "../models/post.js";
import getErrorJson from "./error.js";

async function getLikes(pid) {
    const post = await Post.findById(pid);
    if (!post)
        return getErrorJson(404, ["Post not found"]);

    return post.likes
}

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