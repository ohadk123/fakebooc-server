import TokenService from "../services/tokens.js";
import Runner from "./runner.js";

async function createToken(req, res) {
    const createTokenData = await TokenService.createToken(
        req.body.username,
        req.body.password
    );
    
    Runner.runController(createTokenData, res);
}

function verifyToken(req, res, next) {
    const verifyTokenData = TokenService.verifyToken(
        req.headers.authorization
    );

    if (verifyTokenData.username) {
        req.user = verifyTokenData.username
        return next();
    }

    Runner.runController(verifyTokenData, res);
}

export default {createToken, verifyToken};