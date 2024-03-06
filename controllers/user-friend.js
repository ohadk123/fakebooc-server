import UserFriendService from "../services/user-friend.js";
import Runner from "./runner.js";

// delete
async function deleteUser(req, res) {
    let deleteUserData = Runner.authorizeRequest(req.user, req.params.username);

    if (!deleteUserData)
        deleteUserData = await UserFriendService.deleteUser(
            req.params.username
        );

        Runner.runController(deleteUserData, res);
}

// delete
async function removeFriend(req, res) {
    let removeFriendData = Runner.authorizeRequest(req.user, req.params.username);

    if (!removeFriendData)
        removeFriendData = await UserFriendService.removeFriend(
            req.params.username,
            req.params.fusername
        );

        Runner.runController(removeFriendData, res);
}

// get
async function getUserFriends(req, res) {
    const getUserFriendsData = await UserFriendService.getUserFriends(
        req.user,
        req.params.username
    );

    Runner.runController(getUserFriendsData, res);
}

// post
async function sendFriendRequest(req, res) {
    const sendFriendRequestData = await UserFriendService.sendFriendRequest(
        req.user,
        req.params.username
    );

    Runner.runController(sendFriendRequestData, res);
}

// patch
async function acceptRequest(req, res) {
    let acceptRequestData = Runner.authorizeRequest(req.user, req.params.username);

    if (!acceptRequestData)
        acceptRequestData = await UserFriendService.acceptRequest(
            req.params.fusername,
            req.params.username
        );

    Runner.runController(acceptRequestData, res);
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};