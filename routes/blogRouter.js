import { Router } from "express";
import {
  deleteBlog,
  getBlogs,
  postBlog,
  updateLikes,
} from "../controllers/blogController.js";
import { blogFinder } from "../middlewares/blogFinder.js";
import { tokenExtractor } from "../middlewares/tokenExtractor.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post("/", tokenExtractor, postBlog);
blogRouter.delete("/:id", blogFinder, tokenExtractor, deleteBlog);
blogRouter.put("/:id", blogFinder, tokenExtractor, updateLikes);

export default blogRouter;
