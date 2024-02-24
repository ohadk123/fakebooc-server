import express from "express";
import usersPostsRouter from "./users-posts.js";
import usersFriendsRouter from "./users-friends.js";
const usersRouter = express.Router();

usersRouter.use("/:username/posts", usersPostsRouter);
usersRouter.use("/:username/friends", usersFriendsRouter);

usersRouter.route("/")
    .post();

usersRouter.route("/:username")
    .get()
    .put()
    .delete();

export default usersRouter