import dotenv from "dotenv";
import connectDB from "./database/db.js";
import { app } from "./app.js";

dotenv.config();

connectDB()
    .then(() => {
        const port = process.env.PORT || 4000;
        const server = app.listen(port, () => {
            console.log("\nServer is running on port: ", port);
        })

        server.on("error", (error) => {
            console.log("Server error: ", error);
            process.exit(1)
        })

    }).catch((error) => {
        console.log("MongoDB connection Failed: ", error)
    })