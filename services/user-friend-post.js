import User from "../models/user.js";
import Post from "../models/post.js";
import getErrorJson from "./error.js";

/**
 * Get a list of the 25 most recent posts, 20 of which are from username's friends,
 * and 5 are from users who are not username's friends
 * @param {String} username - User to get feed for
 * @returns :
 * On success - List of posts
 * On failure -
 *      404, "User [username] not found" - If username doesn't exist in database
 */
async function getPostsForFeed(username) {
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

/**
 * Get a list of posts made by uploaderUsername, only if friends with connectedUsername
 * @param {String} connectedUsername - Username of connected user making the request
 * @param {String} uploaderUsername - Username which posts are requested
 * @returns :
 * On success - List of all posts made by uploaderUsername
 * On failure -
 *      403, "Forbidden access" - If users are not friends
 */
async function getUserPosts(connectedUsername, uploaderUsername) {
    const areFriends = (await User.findById(connectedUsername)).friends.includes(uploaderUsername);
    if (!areFriends && connectedUsername !== uploaderUsername)
        return getErrorJson(403, ["Forbidden access"]);

    const posts = Post.find({uploader: uploaderUsername});
    return posts;
}

export default {getPostsForFeed, getUserPosts};