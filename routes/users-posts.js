import express from "express";
const usersPostsRouter = express.Router();

usersPostsRouter.route("/")
    .get()
    .post();

usersPostsRouter.route("/:pid")
    .put()
    .delete();

export default usersPostsRouter