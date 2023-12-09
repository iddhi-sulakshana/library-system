import path from "path";
import dotenv from "dotenv";

// constructing the path to the .env file located in root directory of the application
const envPath = path.join(path.resolve(), "../.env");
// load environment variables from the .env file
dotenv.config({ path: envPath });

export default function () {
    // Setting a default value for the NODE_ENV if not specified
    process.env.NODE_ENV = process.env.NODE_ENV
        ? process.env.NODE_ENV
        : "development";

    // Setting a default value for the DB environment if not specified
    process.env.DB = process.env.DB
        ? process.env.DB
        : "mongodb+srv://admin:1234@abcmovie.jkwlq7i.mongodb.net/?retryWrites=true&w=majority";

    // / Logging information if running in the development environment
    if (process.env.NODE_ENV === "development") {
        console.log("\n🚧 Node running as Development Environment 🚧\n");
        console.log(`Enviroment Variables Loaded: ${envPath}`);
        console.log(`🔑 DB: ${process.env.DB}`);
        console.log();
    }
}
