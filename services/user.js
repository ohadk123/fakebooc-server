import User from "../models/user.js";

async function registerUser(username, displayName, profileImage, password) {
    // Check information
}

async function getUserByUsername(jwt, username) {
    // Different results based on if jwt is the user, friend or not-friend
}

async function updateUser(jwt, username, displayName, password) {
    // Authenticate jwt with username
}

async function loginUser(username, password) {
    
}

export default {registerUser, getUserByUsername, updateUser};