import { Router } from "express";
import { getBlogs } from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.get("/", getBlogs);

export default blogRouter;
