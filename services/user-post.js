import User from "../modules/user.js";
import Post from "../modules/post.js";

async function addPost(jwt, uploader, content) {
    // Authenticate jwt with username
    // Create the post
    // Add post to the uploader's post list
}

async function removePost(jwt, username, pid) {
    // Authenticate jwt with username
    // Remove from uploader's posts list
    // Delete post
}

export default {addPost, removePost};