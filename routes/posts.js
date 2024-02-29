import express from "express";
import UserFriendPostController from "../controllers/user-friend-post.js"
const postsRouter = express.Router();

postsRouter.route("/")
    .get(UserFriendPostController.getPostsForFeed);

export default postsRouter;