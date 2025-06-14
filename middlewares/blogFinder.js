import { Blog } from "../database/models/index.js";

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    return res.status(404).json({ success: false, error: "Blog not found" });
  }

  next();
};
