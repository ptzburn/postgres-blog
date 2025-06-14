import jwt from "jsonwebtoken";
import { SECRET } from "../config/env.js";

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ success: false, error: "token invalid" });
    }
  } else {
    return res.status(401).json({ success: false, error: "token missing" });
  }
  next();
};
