import express from "express";
import CommentController from "../controllers/comments.js";
import CommentLikesController from "../controllers/comments-likes.js";
import TokenController from "../controllers/tokens.js";
const postsCommentsRouter = express.Router({ mergeParams: true });

postsCommentsRouter
  .route("/:cid/likes")
  .get(CommentLikesController.getLikes)
  .post(CommentLikesController.addLike)
  .delete(CommentLikesController.removeLike);

postsCommentsRouter
  .route("/:cid")
  .put(CommentController.updateComment)
  .delete(CommentController.removeComment);

postsCommentsRouter
  .route("/")
  .get(CommentController.getComments)
  .post(CommentController.addComment);

export default postsCommentsRouter;
