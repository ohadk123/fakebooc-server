import User from "../models/user";
import Post from "../models/post";

async function getPostsForFeed(username) {
    // Should get 25 most recenetly uploaded posts
    // 20 posts by (username)'s friends
    // 5 posts by not (username)'s friends
}

async function getUserPosts(connectedUsername, posterUsername) {
    // Only available to friends of (posterUsername)
}

export default {getPostsForFeed, getUserPosts};