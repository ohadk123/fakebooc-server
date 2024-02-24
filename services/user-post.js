import User from "../models/user.js";
import Post from "../models/post.js";

async function addPost(uploader, content) {
    // Create the post
    // Add post to the uploader's post list
}

async function removePost(pid) {
    // Remove from uploader's posts list
    // Delete post
}

export default {addPost, removePost};