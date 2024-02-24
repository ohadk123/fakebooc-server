import express from "express";
const postsRouter = express.Router();

postsRouter.route("/")
.get();

export default postsRouter;