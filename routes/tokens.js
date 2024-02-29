import express from "express";
const tokensRouter = express.Router();

tokensRouter.route("/")
    .post();

export default tokensRouter;