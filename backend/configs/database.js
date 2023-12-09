import winston from "winston";
import mongoose from "mongoose";

export default function () {
    winston.info("Initializing MongoDB Connection");
    // Constructing the MongoDB connection string based on the environment
    const databaseString = process.env.NODE_ENV
        ? `${process.env.DB}_${process.env.NODE_ENV}`
        : process.env.DB;

    winston.info("Connecting to MongoDB at " + databaseString);
    // Attempting to connect to MongoDB using Mongoose
    mongoose
        .connect(databaseString, {
            writeConcern: { w: "majority" },
        })
        .then(() => {
            // Logging successful connection
            winston.info("Connected to MongoDB");
        })
        .catch((ex) => {
            // Logging failure to connect and exiting the process with an error code
            winston.error("Failed to connect to MongoDB");
            process.exit(1);
        });
}
