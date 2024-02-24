import User from "../models/user.js";

async function deleteUser(username) {
    // Remove user from friends' friends list
    // Remove user posts
}

async function addFriend(username1, username2) {
    // Add to each other's friends lis
}

async function removeFriend(username1, username2) {
    // Remove from each other's friends list
}

async function getUserFriends(connectedUsername, requestedUsername) {
    // Only available to friends of (requestedUsername)
}

async function sendFriendRequest(senderUsername, recieverUsername) {
    
}

async function acceptRequest(senderUsername, recieverUsername) {

}

export default {deleteUser, addFriend, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};