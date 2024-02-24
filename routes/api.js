import express from "express";
import router from "./router.js";
const apiRouter = express.Router();

apiRouter.use("/", router);

export default apiRouter;