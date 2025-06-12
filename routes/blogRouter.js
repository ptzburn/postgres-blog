import { Router } from "express";
import {
  deleteBlog,
  getBlogs,
  postBlog,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", postBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
