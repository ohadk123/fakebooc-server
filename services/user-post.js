import User from "../models/user";
import Post from "../models/post";

async function addPost(uploader, content) {
    // Create the post
    // Add post to the uploader's post list
}

async function removePost(pid) {
    // Remove from uploader's posts list
    // Delete post
}

export default {addPost, removePost};