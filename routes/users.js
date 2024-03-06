import express from "express";
import usersPostsRouter from "./users-posts.js";
import usersFriendsRouter from "./users-friends.js";
import UserController from "../controllers/user.js"
import UserFriendController from "../controllers/user-friend.js"
import TokenController from "../controllers/tokens.js";
const usersRouter = express.Router();

usersRouter.use("/:username/posts", TokenController.verifyToken, usersPostsRouter);
usersRouter.use("/:username/friends", TokenController.verifyToken, usersFriendsRouter);

usersRouter.route("/")
    .get(UserController.loginUser)
    .post(UserController.registerUser);

usersRouter.route("/:username")
    .get(TokenController.verifyToken, UserController.getUserByUsername)
    .put(TokenController.verifyToken, UserController.updateUser)
    .delete(TokenController.verifyToken, UserFriendController.deleteUser);

export default usersRouter