import jwt from "jsonwebtoken";
import User from "../models/user.js";
import getErrorJson from "./error.js";

const key = "Fakebooc's super secret key, please don't hack UwU";

/**
 * Checks login attempt and created a Json Web Token for username
 * @param {String} username - Login attempt username
 * @param {String} password - Login attempt password
 * @returns :
 * On success - A special json web token for username
 * On failure -
 *      404, "Incorrect username or password" - If the username doesn't exist or the password doesn't match
 */
async function createToken(username, password) {
    const user = await User.findById(username);
    if (!user || user.password !== password)
        return getErrorJson(404, ["Incorrect username or password"]);

    const token = jwt.sign({username:username}, key);
    return {token: token};
}

/**
 * Veririfies the token the was sent in request
 * @param {String} authorization - authorization header "bearer <token>"
 * @returns :
 * On success - username associated with token
 * On failure -
 *      401, "Invalid token" - If token is incorrect
 *      403, "Token required" - If invalid token has been provided
 */
function verifyToken(authorization) {
    if (authorization) {
        try {
            const token = authorization.split(" ")[1];
            const data = jwt.verify(token, key);
            return data;
        } catch (error) {
            return getErrorJson(401, ["Invalid token"]);
        }
    }
    return getErrorJson(403, ["Token required"]);
}

export default {createToken, verifyToken};

