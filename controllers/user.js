import UserService from "../services/user.js";
import runController from "./runner.js";

// Success - 200 and user data
// Fail - 409 and errors list
async function registerUser(req, res) {
    const registerData = await UserService.registerUser(
        req.body.username,
        req.body.displayName,
        req.body.profileImage,
        req.body.password
    );

    runController("", "", registerData, res);
}

/**
 * find user by /:username
 * throws 404 if user is not found
 */ 
async function getUserInformation(req, res) {
    const getUserInformationData = await UserService.getUserInformation(
        req.params.username
    );

    runController("", "", getUserInformationData, res);
}

async function updateUser(req, res) {
    const updatedUser = await UserService.updateUser(
        req.params.username
    );

    if (!updatedUser)
        return res.status(404).json({errors: ["User not found"]});

    res.status(200).json(updatedUser);
}

export default {registerUser, getUserInformation, updateUser};