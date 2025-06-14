import { User } from "../database/models/index.js";

export const userFinder = async (req, res, next) => {
  req.user = await User.findOne({ where: { username: req.params.username } });

  if (!req.user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  next();
};
