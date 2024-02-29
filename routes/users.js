import express from "express";
import usersPostsRouter from "./users-posts.js";
import usersFriendsRouter from "./users-friends.js";
import UserController from "../controllers/user.js"
import UserFriendController from "../controllers/user-friend.js"
const usersRouter = express.Router();

usersRouter.use("/:username/posts", usersPostsRouter);
usersRouter.use("/:username/friends", usersFriendsRouter);

usersRouter.route("/")
    .get(UserController.loginUser)
    .post(UserController.registerUser);

usersRouter.route("/:username")
    .get(UserController.getUserByUsername)
    .put(UserController.updateUser)
    .delete(UserFriendController.deleteUser);

export default usersRouter