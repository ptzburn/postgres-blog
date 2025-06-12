import { Router } from "express";
import {
  deleteBlog,
  getBlogs,
  postBlog,
  updateLikes,
} from "../controllers/blogController.js";
import { blogFinder } from "../middlewares/blogFinder.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", postBlog);
blogRouter.delete("/:id", blogFinder, deleteBlog);
blogRouter.put("/:id", blogFinder, updateLikes);

export default blogRouter;
