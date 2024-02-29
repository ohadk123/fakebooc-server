import User from "../modules/user.js";
import Post from "../modules/post.js";

async function getPostsForFeed(username) {
    // Should get 25 most recenetly uploaded posts
    // 20 posts by (username)'s friends
    // 5 posts by not (username)'s friends
}

async function getUserPosts(jwt, connectedUsername, posterUsername) {
    // Authenticate jwt with connectedUsername
    // Only available to friends of (posterUsername)
}

export default {getPostsForFeed, getUserPosts};