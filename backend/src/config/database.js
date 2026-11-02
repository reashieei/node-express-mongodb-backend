import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const baseUri = process.env.MONGODB_URI || "";
        const mongoUri = baseUri.endsWith("/")
            ? `${baseUri}${DB_NAME}`
            : `${baseUri}/${DB_NAME}`;

        const connectionInstance = await mongoose.connect(mongoUri);
        console.log(`\nMongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.error("MongoDB connection FAILED: ", error);
        process.exit(1);
    }
};

export default connectDB;
