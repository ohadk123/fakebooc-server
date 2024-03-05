import UserService from "../services/user.js";

// Success - 200 and user data
// Fail - 409 and errors list
async function registerUser(req, res) {
    const registerData = await UserService.registerUser(
        req.body.username,
        req.body.displayName,
        req.body.profileImage,
        req.body.password
    );
    
    const errors = registerData.errors;
    if (errors)
        res.status(409);
    else
        res.status(200);

    res.json(registerData);
}

/**
 * find user by /:username
 * throws 404 if user is not found
 */ 
async function getUserInformation(req, res) {
    const user = await UserService.getUserInformation(
        req.params.username
    );

    if (!user)
        return res.status(404).json({errors: ["User not found"]});

    res.json(user);
}

async function updateUser(req, res) {
    const updatedUser = await UserService.updateUser(
        req.params.username
    );

    if (!updatedUser)
        return res.status(404).json({errors: ["User not found"]});

    res.json(updatedUser);
}

export default {registerUser, getUserInformation, updateUser};