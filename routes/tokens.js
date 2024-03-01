import express from "express";
import TokenController from "../controllers/tokens.js";
const tokensRouter = express.Router();

tokensRouter.route("/")
    .post(TokenController.createToken);

export default tokensRouter;