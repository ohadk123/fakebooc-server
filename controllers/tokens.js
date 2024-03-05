import TokenService from "../services/tokens.js";
import UserService from "../services/user.js";

async function createToken(req, res) {
    const verifyLogin = await UserService.verifyLogin(
        req.body.username,
        req.body.password
    );
    if (!verifyLogin)
        return res.status(404).json({errors: ["Incorrect username or password"]});

    const token = TokenService.createToken(req.body.username);
    res.status(200).json({token:token});
}

function verifyToken(req, res, next) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = TokenService.verifyToken(token);
            req.user = data.username;
            return next();
        } catch (error) {
            return res.status(401).json({errors: ["Invalid Token"]});
        }
    }
    res.status(403).json({errors: ["Token required"]});
}

export default {createToken, verifyToken};