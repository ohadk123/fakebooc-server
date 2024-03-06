import UserService from "../services/user.js";
import Runner from "./runner.js";

// Success - 200 and user data
// Fail - 409 and errors list
async function registerUser(req, res) {
    const registerData = await UserService.registerUser(
        req.body.username,
        req.body.displayName,
        req.body.profileImage,
        req.body.password
    );

    Runner.runController(registerData, res);
}

/**
 * find user by /:username
 * throws 404 if user is not found
 */ 
async function getUserInformation(req, res) {
    const getUserInformationData = await UserService.getUserInformation(
        req.params.username
    );

    Runner.runController(getUserInformationData, res);
}

async function updateUser(req, res) {
    let updateUserData = Runner.authorizeRequest(req.user, req.params.username);

    if (!updateUserData)
        updateUserData = await UserService.updateUser(
            req.params.username,
            req.params.displayName,
            req.params.profileImage
        );

        Runner.runController(req.user, req.params.username, updateUserData, res);
}

export default {registerUser, getUserInformation, updateUser};