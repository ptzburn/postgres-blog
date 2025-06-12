import express from "express";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { PORT } from "./config/env.js";
import blogRouter from "./routes/blogRouter.js";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(errorMiddleware);

app.get("/api", (req, res) => {
  res.send("Welcome to the Blog API!");
});

app.listen(PORT || 3001, () => {
  console.log(`Server is up and running at http://localhost:${PORT || 3001}`);
});
