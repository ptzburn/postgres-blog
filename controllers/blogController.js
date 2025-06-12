import Blog from "../database/models/Blog.js";

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};
