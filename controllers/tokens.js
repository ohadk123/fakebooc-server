import TokenService from "../services/tokens.js";

function createToken(req, res) {
    const token = TokenService.createToken(req.body.username);
    res.json({token:token});
}

function verifyToken(req, res, next) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = TokenService.verifyToken(token);
            req.user = data.username;
            return next();
        } catch (error) {
            return res.status(401).send("Invalid Token");
        }
    } else {
        return res.status(403).send('Token required');
    }
}

export default {createToken, verifyToken};