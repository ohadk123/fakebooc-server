import express from "express";
import UserFriendController from "../controllers/user-friend.js";
import TokenController from "../controllers/tokens.js";
const usersFriendsRouter = express.Router({mergeParams: true});

usersFriendsRouter.route("/")
    .get(TokenController.verifyToken, UserFriendController.getUserFriends)
    .post(TokenController.verifyToken, UserFriendController.sendFriendRequest);

usersFriendsRouter.route("/:fusername")
    .patch(TokenController.verifyToken, UserFriendController.acceptRequest)
    .delete(TokenController.verifyToken, UserFriendController.removeFriend);

export default usersFriendsRouter