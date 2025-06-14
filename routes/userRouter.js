import {
  addUser,
  changeEmail,
  getUsers,
} from "../controllers/userController.js";
import { userFinder } from "../middlewares/userFinder.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);
userRouter.put("/:username", userFinder, changeEmail);

export default userRouter;
