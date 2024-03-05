import express from "express";
import usersRouter from "./users.js";
import postsRouter from "./posts.js";
import tokensRouter from "./tokens.js";
import TokenController from "../controllers/tokens.js";
const apiRouter = express.Router({mergeParams: true});

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", TokenController.verifyToken,  postsRouter);
apiRouter.use("/tokens", tokensRouter);

export default apiRouter;