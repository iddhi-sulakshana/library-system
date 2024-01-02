import mongoose from "mongoose";
import envConfig from "../configs/environment.js";
import initWebSocket from "../configs/websocket.js";
import express from "express";
// initialize envirtonment variables
envConfig();
// express app
const app = express();
// initialize database connection
const databaseString = process.env.NODE_ENV
    ? `${process.env.DB}_${process.env.NODE_ENV}?retryWrites=true&w=majority`
    : process.env.DB;

mongoose.connect(databaseString).catch((ex) => {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
});
const server = initWebSocket(app);

export default server;
