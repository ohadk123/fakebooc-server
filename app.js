import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import customEnv from "custom-env";
import apiRouter from "./routes/api.js";

customEnv.env(process.env.NODE_ENV, "./config");
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

mongoose.connect(process.env.CONNECTION_STRING, {});

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRouter);

app.listen(process.env.PORT);
