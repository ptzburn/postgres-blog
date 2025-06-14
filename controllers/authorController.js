import { Blog } from "../database/models/index.js";
import { sequelize } from "../database/postgres.js";

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [["likes", "DESC"]],
    });

    res.status(200).json({ success: true, data: authors });
  } catch (error) {
    next(error);
  }
};
