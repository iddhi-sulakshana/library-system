import mongoose from "mongoose";
import express from "express";
import envConfig from "../configs/environment.js";
import routes from "../configs/routes.js";

// initialize environment variables
envConfig();

// connect to database
mongoose.connect(process.env.DB, {
    writeConcern: { w: "majority" },
});

// intialize application
const app = express();

// initialize routes
routes(app);

export default app;
