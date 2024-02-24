import express from "express";
const usersFriendsRouter = express.Router();

usersFriendsRouter.route("/")
    .get()
    .post();

    usersFriendsRouter.route("/:fusername")
    .patch()
    .delete();

export default usersFriendsRouter