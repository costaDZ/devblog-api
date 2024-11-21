import express from "express";

import "dotenv/config";
import connectToDB from "./config/db";
import blogRoutes from "./routes/blogRoutes";
import authRoutes from "./routes/authRoutes";
import {verifyToken} from "@middlewares/authMiddleware";
require("dotenv").config({path: `.env.${process.env.NODE_ENV || "development"}`});

const app = express();
const PORT = process.env.PORT || 5000;
AbortController;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", verifyToken, blogRoutes);

connectToDB(() => {
  app.listen(PORT, () => {
    console.log(`Server --- http://localhost:${PORT}`);
  });
});
