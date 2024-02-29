import UserFriendService from "../services/user-friend.js";

// delete
async function deleteUser(req, res) {
    // Remove user from friends' friends list
    // Remove user posts
}

// delete
async function removeFriend(req, res) {
    // Remove from each other's friends list
}

// get
async function getUserFriends(req, res) {
    // Only available to friends of (requestedUsername)
}

// post
async function sendFriendRequest(req, res) {
    
}

// patch
async function acceptRequest(req, res) {
    // Add to each other's friends list
}

export default {deleteUser, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};