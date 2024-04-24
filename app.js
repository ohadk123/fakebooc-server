import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import customEnv from "custom-env";
import apiRouter from "./routes/api.js";
import audit from "express-requests-logger";
import path from "path";
import { fileURLToPath } from "url";

import checkServer from "./bf-client.js"; // Note the '.js' extension
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

function getLink(content) {
  // Define the regex pattern for URLs
  const regex =
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|(([^\s()<>]+|(([^\s()<>]+)))))+(?:(([^\s()<>]+|(([^\s()<>]+))))|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi;

  // Use the regex to find matches in the content
  const matches = content.match(regex);

  // Return the matches or an empty array if no matches are found
  return matches || [];
}

const content =
  "Check out this website www.example.com or you can also visit https://www.another-example.org.";
const links = getLink(content);
checkServer(links[0]);
console.log(links);
