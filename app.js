import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import customEnv from "custom-env";
import apiRouter from "./routes/api.js";
import audit from "express-requests-logger";
import path from "path";
import { fileURLToPath } from "url";

customEnv.env(process.env.NODE_ENV, "./config");
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING, {});
const __filename = fileURLToPath(import.meta.url);
console.log("file name:", __filename);
const __dirname = path.dirname(__filename);
console.log("dir name:", __dirname);

const app = express();

app.use(express.static(path.join(__dirname, "build")));
// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
  console.log("boubou");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRouter);
app.use(audit());
app.use((req, res, next) => {
  next();
});
app.listen(process.env.PORT);
