import express from "express";
import TokenController from "../controllers/tokens.js";
const tokensRouter = express.Router({mergeParams: true});

tokensRouter.route("/")
    .post(TokenController.createToken);

export default tokensRouter;