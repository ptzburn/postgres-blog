import Blog from "../database/models/Blog.js";

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blogToDelete = await Blog.findByPk(req.params.id);

    await blogToDelete.destroy();

    return res.status(200).json({ success: true, data: blogToDelete });
  } catch (error) {
    next(error);
  }
};
