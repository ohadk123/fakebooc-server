import jwt from "jsonwebtoken";
const key = "Fakebooc's super secret key, please don't hack UwU";

function createToken(username) {
    return jwt.sign({username:username}, key);

}

function verifyToken(token) {
    return jwt.verify(token, key);
}

export default {createToken, verifyToken};

