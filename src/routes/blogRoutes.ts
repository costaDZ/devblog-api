import express from "express";
import createBlog from "../controllers/blogController";

const router = express.Router();

router.post("/add-blog", createBlog);

export default router;
