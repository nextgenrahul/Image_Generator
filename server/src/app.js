import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "https://image-generator-frontend-xi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/images", imageRouter);

/* ✅ IMPORTANT: handle OPTIONS explicitly */
app.options("*", cors());

export default app;
