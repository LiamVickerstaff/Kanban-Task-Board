import express, { Request, Response } from "express";
import cors from "cors";
import taskRouter from "./routers/task";
import subtaskRouter from "./routers/subtask";
import boardRouter from "./routers/board";
import { clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/test", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  console.log("userId received from clerk from frontend: ", userId);
});

app.use("/board", requireAuth(), boardRouter);
app.use("/task", taskRouter);
app.use("/subtask", subtaskRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
