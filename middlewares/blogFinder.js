import { Blog } from "../database/models/index.js";

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};
