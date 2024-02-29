import User from "../modules/user.js";

async function deleteUser(jwt, username) {
    // Authenticate jwt with username
    // Remove user from friends' friends list
    // Remove user posts
}

async function addFriend(jwt, username1, username2) {
    // Authenticate jwt with username1
    // Add to each other's friends lis
}

async function removeFriend(jwt, username1, username2) {
    // Authenticate jwt with username1
    // Remove from each other's friends list
}

async function getUserFriends(jwt, username, requestedUsername) {
    // Authenticate jwt with username
    // Only available to friends of (requestedUsername)
}

async function sendFriendRequest(jwt, senderUsername, recieverUsername) {
    // Authenticate jwt with senderUsername
}

async function acceptRequest(jwt, senderUsername, recieverUsername) {
    // Authenticate jwt with recieverUsername
}

export default {deleteUser, addFriend, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};