console.clear();

import express from "express";
import envConfig from "./configs/environment.js";
import winston from "./configs/logger.js";
import databaseConfig from "./configs/database.js";
import routes from "./configs/routes.js";
import migrate from "./models/migrate.js";

// initialize environment variables
envConfig();
// initialize express application
const app = express();
// initialize winston logger
const logger = winston();
// intialize database connection
await databaseConfig();
// initialize db with collections migrations
await migrate();
// initialize routes
routes(app);

// run the server application
app.listen(process.env.PORT || 3000, () => {
    logger.info(
        `Server listening on: http://localhost:${process.env.PORT || 3000}`
    );
});

export default app;
