import UserFriendPostService from "../services/user-friend-post.js";
import runController from "./runner.js";

// get
async function getPostsForFeed(req, res) {
    const getPostsForFeedData = await UserFriendPostService.getPostsForFeed(
        req.user
    );

    runController(getPostsForFeedData, res);
}

// get
async function getUserPosts(req, res) {
    const getUserPostsData = await UserFriendPostService.getUserPosts(
        req.user,
        req.params.username
    );

    runController(getUserPostsData, res);
}

export default {getPostsForFeed, getUserPosts};