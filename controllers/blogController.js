import { Blog } from "../database/models/index.js";

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
    await req.blog.destroy();

    return res.status(200).json({ success: true, data: req.blog });
  } catch (error) {
    next(error);
  }
};

export const updateLikes = async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.status(200).json({ success: true, data: req.blog });
  } catch (error) {
    next(error);
  }
};
