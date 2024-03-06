import express from "express";
import CommentController from "../controllers/comments.js";
import TokenController from "../controllers/tokens.js";
const postsCommentsRouter = express.Router({mergeParams: true});

postsCommentsRouter.route('/')
    .get(TokenController.verifyToken, CommentController.getComments)
    .post(TokenController.verifyToken, CommentController.addComment);

    postsCommentsRouter.route("/:cid")
    .put(TokenController.verifyToken, CommentController.updateComment)
    .delete(TokenController.verifyToken, CommentController.updateComment);


export default postsCommentsRouter