const userFriendPostService = require("../services/user-friend-post.js");

async function getPostsForFeed(req, res) {
    // Should get 25 most recenetly uploaded posts
    // 20 posts by (username)'s friends
    // 5 posts by not (username)'s friends
}

async function getUserPosts(req, res) {
    // Only available to friends of (posterUsername)
}

export default {getPostsForFeed, getUserPosts};