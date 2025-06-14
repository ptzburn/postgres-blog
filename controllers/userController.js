import { Blog, User } from "../database/models/index.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Please, provide all the necessary fields.",
      });
    }
    if (req.body.password.length < 8) {
      console.error("Password must be at least 8 characters long");
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    // Check if a user already exists
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    const { password, ...userData } = req.body;

    const newUser = await User.create({ ...userData, hashedpassword });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changeEmail = async (req, res, next) => {
  try {
    req.user.email = req.body.email;
    await req.user.save();
    return res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};
