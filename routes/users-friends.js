import express from "express";
import UserFriendController from "../controllers/user-friend.js"
const usersFriendsRouter = express.Router();

usersFriendsRouter.route("/")
    .get(UserFriendController.getUserFriends)
    .post(UserFriendController.sendFriendRequest);

usersFriendsRouter.route("/:fusername")
    .patch(UserFriendController.acceptRequest)
    .delete(UserFriendController.removeFriend);

export default usersFriendsRouter