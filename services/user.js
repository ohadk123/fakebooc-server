import User from "../models/user.js";
import getErrorJson from "./error.js";

/**
 * @returns new user created
 * if any verification error accrued:
 * errors[0]: username error
 * errors[1]: password error
 * errors[2]: displayName error
 * errors[3]: profileImage error
 */
async function registerUser(username, displayName, profileImage, password) {
    let hasErrors = false;
    let errors = [];
    const user = await getUser(username);
    if (user) {
        errors.push("Username already in user");
        hasErrors = true;
    }
    else
        errors.push("");

    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~-]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLengthValid = password.length >= 8;

    let passwordErrors = "";
    if (!hasUpperCase)
        passwordErrors += "Password must have an uppercase letter\n";
    if (!hasSpecialChar)
        passwordErrors += "Password must have a special character\n";
    if (!hasNumber)
        passwordErrors += "Password must had a number\n";
    if (!isLengthValid)
        passwordErrors += "Password must be at least 8 characters long\n";

    if (passwordErrors !== "") {
        errors.push(passwordErrors);
        hasErrors = true;
    }
    else
        errors.push("");

    if (!displayName) {
        errors.push("Please enter a display name");
        hasErrors = true;
    }
    else
        errors.push("");

    if (!profileImage) {
        errors.push("Please upload a profile picture");
        hasErrors = true;
    }
    else
        errors.push("");

    if (hasErrors)
        return getErrorJson(409, errors);

    // TODO: Add user to db
    return await addUser(
        username,
        displayName,
        profileImage,
        password
    );
}

async function getUserInformation(username) {
    const user = await getUser(username);
    if (!user)
        return getErrorJson(404, ["User not found"]);

    return {
        username: user._id,
        displayName: user.displayName,
        profileImage: user.profileImage
    };
}

/**
 * Updates a user in db, changes fields displayName and profileImage
 * Only if they are not null
 * @returns Updated user, null if user doesn't exist
 */
async function updateUser(username, newDisplayName, newProfileImage) {
    const user = await getUser(username);
    if (!user)
        return getErrorJson(404, ["User not found"]);

    let displayName = user.displayName;
    let profileImage = user.profileImage;
    
    if (newDisplayName)
        displayName = newDisplayName;
    if (newProfileImage)
        profileImage = newProfileImage;

    await User.findByIdAndUpdate(username, {
        displayName: displayName,
        profileImage: profileImage
    });

    return await getUser(username);
}

async function verifyLogin(username, password) {
    const user = await getUser(username);
    if (!user)
        return false;
    if (user.password !== password)
        return false;
    return true;
}

export default {registerUser, getUserInformation, updateUser, verifyLogin};

//---------------------------------------------------------------------------------------------------------

{ // Helper Functions
    async function getUser(username) {
        return await User.findById(username);
    }

    /**
     * Adds a user to the database.
     * @param {String} username - A unique username for the user.
     * @param {String} displayName - A display name for the platform.
     * @param {String} profileImage - A profile picture encoded in base64
     * @param {String} password - A secret password used to login
     * @returns A json of the new user that was created.
     */
    async function addUser(username, displayName, profileImage, password) {
        // TODO: handle errors
        const user = new User({
            _id: username,
            displayName: displayName,
            profileImage: profileImage,
            password: password
        });
        return await user.save();
    }
}