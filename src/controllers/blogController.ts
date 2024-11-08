import {Request, Response} from "express";
import {BlogRequestBody, Blog} from "../models";

const createBlog = async (req: Request<{}, {}, BlogRequestBody>, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "An unknown error occurred"});
    }
  }
};

export default createBlog;
