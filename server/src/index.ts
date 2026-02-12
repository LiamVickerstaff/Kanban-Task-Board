import express, { Request, Response } from "express";
import cors from "cors";
import userRouter from "./routers/user";
import taskRouter from "./routers/task";
import boardRouter from "./routers/board";
import { mockUserMiddleware } from "./middleware/mockUser.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
// app.use(mockUserMiddleware);

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/board", boardRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
