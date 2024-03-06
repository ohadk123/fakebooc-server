import jwt from "jsonwebtoken";
import User from "../models/user.js";
import getErrorJson from "./error.js";

const key = "Fakebooc's super secret key, please don't hack UwU";

async function createToken(username, password) {
    const user = await User.findById(username);
    if (!user || user.password !== password)
        return getErrorJson(404, ["Incorrect username or password"]);

    const token = jwt.sign({username:username}, key);
    return {token: token};
}

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

