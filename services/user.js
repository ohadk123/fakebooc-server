import User from "../models/user.js";

async function registerUser(username, displayName, profileImage, password) {
    // Check information
}

async function getUserByUsername(username) {
    
}

async function updateUser(username, displayName, profileImage) {
    
}

async function loginUser(username, password) {
    // ...
    return getTokenAfterLogin(username);
}

export default {registerUser, getUserByUsername, updateUser};