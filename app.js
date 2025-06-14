import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { PORT } from "./config/env.js";
import blogRouter from "./routes/blogRouter.js";
import { connectToDatabase } from "./database/postgres.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.get("/api", (req, res) => {
  res.send("Welcome to the Blog API!");
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is up and running at http://localhost:${PORT || 3001}`);
  });
};

start();
