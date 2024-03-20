import express from "express";
import UserFriendPostController from "../controllers/user-friend-post.js";
import PostLikesController from "../controllers/posts-likes.js";
import PostsCommentsRouter from "./posts-comments.js";
import TokenController from "../controllers/tokens.js";
const postsRouter = express.Router({ mergeParams: true });

postsRouter.use("/:pid/comments", PostsCommentsRouter);

postsRouter
  .route("/:pid/likes")
  .get(PostLikesController.getLikes)
  .post(PostLikesController.addLike)
  .delete(PostLikesController.removeLike);

postsRouter.route("/").get(UserFriendPostController.getPostsForFeed);

export default postsRouter;
