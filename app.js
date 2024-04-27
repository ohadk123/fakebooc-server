import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import customEnv from "custom-env";
import apiRouter from "./routes/api.js";
import audit from "express-requests-logger";
import path from "path";
import { checkServer } from "./bf-client.js"; // Note the '.js' extension

import fs from "fs/promises";
import { fileURLToPath } from "url";

customEnv.env(process.env.NODE_ENV, "./config");

mongoose.connect(process.env.CONNECTION_STRING, {});
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
app.listen(process.env.PORT);

async function makeSequentialCallsFromFile() {
  try {
    // Read the entire content of list.txt
    const data = await fs.readFile("list.txt", "utf8");
    // Split the file content by new lines into an array of commands
    const commands = data.split("\n").filter((line) => line.trim() !== "");

    // Iterate through each command and await its server check
    for (const command of commands) {
      const response = await checkServer(command);
      console.log(`Response for "${command}":`, response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
makeSequentialCallsFromFile();
