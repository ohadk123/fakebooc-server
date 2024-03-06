import TokenService from "../services/tokens.js";
import UserService from "../services/user.js";
import runController from "./runner.js";

async function createToken(req, res) {
    const createTokenData = await TokenService.createToken(
        req.body.username,
        req.body.password
    );
    
    runController("", "", createTokenData, res);
}

function verifyToken(req, res, next) {
    const verifyTokenData = TokenService.verifyToken(
        req.headers.authorization
    );

    if (verifyTokenData.username) {
        req.user = verifyTokenData.username
        return next();
    }

    runController("", "", verifyTokenData, res);
}

export default {createToken, verifyToken};