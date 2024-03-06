import User from "../models/user.js";
import getErrorJson from "./error.js";

/**
 * Check inputs and adds user to the database
 * @param {String} username - Unique identifier for user
 * @param {String} displayName - A name that will be displayed on the platform
 * @param {Base64} profileImage - A profile picture that will be displayed on the platform
 * @param {String} password - A secret password to authenticate login attempt
 * @returns :
 * On success - User information as it shows on db
 * if any input errors accrued -
 *      409,
 *      errors[0]: "Username already in user" - If username already exists in the db
 *      errors[1]: A concatinated string of password errors
 *      errors[2]: "Please enter a display name" - If displayName is null
 *      errors[3]: "Please upload a profile picture" - If profileImage is null
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

    return await addUser(
        username,
        displayName,
        profileImage,
        password
    );
}

/**
 * Get user's information
 * @param {String} username - User to find
 * @returns :
 * On success - username, displayName and profileImage
 * On failure:
 *      404 "User not found" error
 */
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
 * @param {String} username - User to update
 * @param {String} newDisplayName - New display name to update to
 * @param {Base64} newProfileImage - New profile image to update to
 * @returns:
 * On success - Updated user's information
 * On failure:
 *      404 "User not found" error
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

    return {
        username: username,
        displayName: newDisplayName,
        profileImage: newProfileImage
    };
}

export default {registerUser, getUserInformation, updateUser};

//---------------------------------------------------------------------------------------------------------
async function getUser(username) {
    return await User.findById(username);
}

async function addUser(username, displayName, profileImage, password) {
    const user = new User({
        _id: username,
        displayName: displayName,
        profileImage: profileImage,
        password: password
    });
    return await user.save();
}
