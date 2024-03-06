import User from "../models/user.js";
import Post from "../models/post.js";
import getErrorJson from "./error.js";

async function getPostsForFeed(username) {
    // Should get 25 most recenetly uploaded posts
    // 20 posts by (username)'s friends
    // 5 posts by not (username)'s friends
    if (!(await User.findById(username)))
        return getErrorJson(404, ["User [" + username + "] not found"]);

    const posts = await Post.find({}).sort("date");
    const user = await User.findById(username);
    const feed = [];

    let friendsPostsLeft = 20;
    let othersPostsLeft = 5;

    while(posts.length > 0) {
        let post = posts.pop();
        let uploader = await User.findById(post.uploader);

        if (username == uploader)
            continue;

        if (user.friends.includes(uploader._id)) {
            if (friendsPostsLeft > 0) {
                feed.unshift(post);
                friendsPostsLeft--;
            }
        } else if (othersPostsLeft > 0) {
            feed.unshift(post);
            othersPostsLeft--;
        } else break;
    }

    return {posts: feed};
}

async function getUserPosts(connectedUsername, uploaderUsername) {
    // Only available to friends of (posterUsername)
    const areFriends = (await User.findById(connectedUsername)).friends.includes(uploaderUsername);
    if (!areFriends && connectedUsername !== uploaderUsername)
        return getErrorJson(403, ["Forbidden access to [" + uploaderUsername + "]'s posts"]);

    const posts = Post.find({uploader: uploaderUsername});
    return posts;
}

export default {getPostsForFeed, getUserPosts};