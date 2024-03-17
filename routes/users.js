import express from "express";
import usersPostsRouter from "./users-posts.js";
import usersFriendsRouter from "./users-friends.js";
import UserController from "../controllers/user.js";
import UserFriendController from "../controllers/user-friend.js";
import TokenController from "../controllers/tokens.js";
const usersRouter = express.Router({ mergeParams: true });

usersRouter.use("/:username/posts", usersPostsRouter);
usersRouter.use("/:username/friends", usersFriendsRouter);

usersRouter.route("/").post(UserController.registerUser);

usersRouter
  .route("/:username")
  .get(TokenController.verifyToken, UserController.getUserInformation)
  .put(TokenController.verifyToken, UserController.updateUser)
  .delete(TokenController.verifyToken, UserFriendController.deleteUser);

export default usersRouter;
