import express from "express";
import usersRouter from "./users.js";
import postsRouter from "./posts.js";
import tokensRouter from "./tokens.js";
const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tokens", tokensRouter);

export default apiRouter;