import { User } from "../database/models/index.js";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      data: {
        token,
        username: user.username,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
