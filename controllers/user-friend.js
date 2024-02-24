import userFriendService from "../services/user-friend";

async function deleteUser(req, res) {
    // Remove user from friends' friends list
    // Remove user posts
}

async function addFriend(req, res) {
    // Add to each other's friends lis
}

async function removeFriend(req, res) {
    // Remove from each other's friends list
}

async function getUserFriends(req, res) {
    // Only available to friends of (requestedUsername)
}

async function sendFriendRequest(req, res) {
    
}

async function acceptRequest(req, res) {

}

export default {deleteUser, addFriend, removeFriend, getUserFriends, sendFriendRequest, acceptRequest};