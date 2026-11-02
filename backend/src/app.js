import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

// Common Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

export default app;
export { app };
