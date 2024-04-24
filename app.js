customEnv.env(process.env.NODE_ENV, "./config");

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import customEnv from "custom-env";
import apiRouter from "./routes/api.js";
import audit from "express-requests-logger";
import path from "path";

import checkServer from "./bf-client.js";

import { fileURLToPath } from "url";

// let CONNECTION_STRING="mongodb://localhost:27017"
mongoose.connect(process.env.CONNECTION_STRING, {});
mongoose.connect(CONNECTION_STRING, {});


const __filename = fileURLToPath(import.meta.url);
// console.log("file name:", __filename);
const __dirname = path.dirname(__filename);
// console.log("dir name:", __dirname);

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(audit());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", apiRouter);
// Handles any requests that don't match the ones above
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("*", (req, res) => {
  console.log("bibi");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use((req, res, next) => {
  next();
});


async function interactWithServer() {
    try {
        const response = await checkServer('Hello, Server!');
        console.log('Server response:', response);
    } catch (error) {
        console.error('Error communicating with server:', error);
    }
}

interactWithServer();



app.listen(process.env.PORT);
