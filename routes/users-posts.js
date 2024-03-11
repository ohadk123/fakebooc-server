import express from "express";
import PostController from "../controllers/post.js";
import UserPostController from "../controllers/user-post.js";
import TokenController from "../controllers/tokens.js";
import UserFriendPostController from "../controllers/user-friend-post.js";

const usersPostsRouter = express.Router({ mergeParams: true });

usersPostsRouter
  .route("/")
  .get(TokenController.verifyToken, UserFriendPostController.getUserPosts)
  .post(TokenController.verifyToken, UserPostController.addPost);

usersPostsRouter
  .route("/:pid")
  .put(TokenController.verifyToken, PostController.updatePost)
  .delete(TokenController.verifyToken, UserPostController.removePost);

export default usersPostsRouter;
