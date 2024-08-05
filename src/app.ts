import 'reflect-metadata';
import express = require("express");
import bodyParser = require("body-parser");
import Router from "./Routes/index";
import cors from "cors";
import dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "5mb" }));

app.use(cors());

app.use("/api", Router);

export default app;
