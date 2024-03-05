import express from "express";
import usersPostsRouter from "./users-posts.js";
import usersFriendsRouter from "./users-friends.js";
import UserController from "../controllers/user.js"
import UserFriendController from "../controllers/user-friend.js"
import TokenController from "../controllers/tokens.js";
const usersRouter = express.Router();

usersRouter.use("/:username/posts", usersPostsRouter); // TODO: add token verification
usersRouter.use("/:username/friends", usersFriendsRouter); // TODO: add token verification

usersRouter.route("/")
    .post(UserController.registerUser);

usersRouter.route("/:username")
    .get(UserController.getUserInformation) // TODO: add token verification
    .put(UserController.updateUser) // TODO: add token verification
    .delete(UserFriendController.deleteUser); // TODO: add token verification

export default usersRouter