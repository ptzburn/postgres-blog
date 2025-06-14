import { Blog, User } from "../database/models/index.js";

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const postBlog = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });

    return res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id, {
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });

    if (
      !user.blogs ||
      !user.blogs.map((b) => b.toJSON().id).includes(req.blog.id)
    ) {
      return res.status(401).json({ success: false, error: "Not Authorized" });
    }
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
