import express from "express";
import UserFriendPostController from "../controllers/user-friend-post.js";
import PostsCommentsRouter from "./posts-comments.js";
const postsRouter = express.Router({mergeParams: true});

postsRouter.use("/comments", PostsCommentsRouter);

postsRouter.route("/")
    .get(UserFriendPostController.getPostsForFeed);

export default postsRouter;