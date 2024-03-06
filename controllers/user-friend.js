import UserFriendService from "../services/user-friend.js";
import {authorizeRequest, runController} from "./runner.js";

// delete
async function deleteUser(req, res) {
    let deleteUserData = authorizeRequest(req.user, req.params.username);

    if (!deleteUserData)
        deleteUserData = await UserFriendService.deleteUser(
            req.params.username
        );

    runController(deleteUserData, res);
}

// delete
async function removeFriend(req, res) {
    let removeFriendData = authorizeRequest(req.user, req.params.username);

    if (!removeFriendData)
        removeFriendData = await UserFriendService.removeFriend(
            req.params.username,
            req.params.fusername
        );

    runController(removeFriendData, res);
}

// get
async function getUserFriends(req, res) {
    const getUserFriendsData = await UserFriendService.getUserFriends(
        req.user,
        req.params.username
    );

    runController(getUserFriendsData, res);
}

// post
async function sendFriendRequest(req, res) {
    const sendFriendRequestData = await UserFriendService.sendFriendRequest(
        req.user,
        req.params.username
    );

    runController(sendFriendRequestData, res);
}

// patch
async function acceptRequest(req, res) {
    let acceptRequestData = authorizeRequest(req.user, req.params.username);

    if (!acceptRequestData)
        acceptRequestData = await UserFriendService.acceptRequest(
            req.params.fusername,
            req.params.username
        );

    runController(acceptRequestData, res);
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};