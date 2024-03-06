import express from "express";
import CommentController from "../controllers/comments.js";
import CommentLikesController from "../controllers/comments-likes.js";
import TokenController from "../controllers/tokens.js";
const postsCommentsRouter = express.Router({mergeParams: true});

postsCommentsRouter.route("/:cid/likes")
    .get(TokenController.verifyToken, CommentLikesController.getLikes)
    .post(TokenController.verifyToken, CommentLikesController.addLike)
    .delete(TokenController.verifyToken, CommentLikesController.removeLike);

postsCommentsRouter.route("/:cid")
    .put(TokenController.verifyToken, CommentController.updateComment)
    .delete(TokenController.verifyToken, CommentController.removeComment);

postsCommentsRouter.route('/')
    .get(TokenController.verifyToken, CommentController.getComments)
    .post(TokenController.verifyToken, CommentController.addComment);



export default postsCommentsRouter