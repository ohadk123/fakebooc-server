import UserFriendService from "../services/user-friend.js";
import runController from "./runner.js";

// delete
async function deleteUser(req, res) {
    const deleteUserData = await UserFriendService.deleteUser(
        req.params.username
    );

    runController(req.user, req.params.username, deleteUserData, res);
}

// delete
async function removeFriend(req, res) {
    const removeFriendData = await UserFriendService.removeFriend(
        req.params.username,
        req.params.fusername
    );

    runController(req.user, req.params.username, removeFriendData, res);
}

// get
async function getUserFriends(req, res) {
    const getUserFriendsData = await UserFriendService.getUserFriends(
        req.user,
        req.params.username
    );

    runController("", "", getUserFriendsData, res);
}

// post
async function sendFriendRequest(req, res) {
    const sendFriendRequestData = await UserFriendService.sendFriendRequest(
        req.user,
        req.params.username
    );

    runController("", "", sendFriendRequestData, res);
}

// patch
async function acceptRequest(req, res) {
    const acceptRequestData = await UserFriendService.acceptRequest(
        req.params.fusername,
        req.params.username
    );

    runController(req.user, req.params.username, acceptRequestData, res);
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};