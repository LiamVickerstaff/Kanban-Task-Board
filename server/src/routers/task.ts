import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.post("/new", async (req: Request, res: Response) => {
  const { newTask } = req.body;

  console.log("taskData:", newTask);

  try {
    const task = await prisma.task.create({
      data: {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        order: newTask.order,
        columnId: newTask.columnId,

        subtasks: {
          create: newTask.subtasks,
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully created new task", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to save new task" });
  }
});

router.put("/:id/subtasks", (req: Request, res: Response) => {
  const data = req.body;
  const taskId = req.params.id;

  return res
    .status(200)
    .json({ message: `Updated subtasks for task: ${taskId}`, data });
});

router.put("/:id/status", (req: Request, res: Response) => {
  const data = req.body;
  const taskId = req.params.id;

  return res
    .status(200)
    .json({ message: `Updated status of task: ${taskId}`, data });
});

router.put("/:id", (req: Request, res: Response) => {
  const data = req.body;
  const taskId = req.params.id as string;

  try {
    const savedTask = prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        order: data.order,
      },
    });

    return res
      .status(200)
      .json({ message: `Updated task of id: ${taskId}`, savedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update task" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const taskId = req.params.id;

  console.log(taskId);

  if (typeof taskId !== "string")
    return res.status(500).json({ message: "Received invalid taskId" });

  try {
    await prisma.task.delete({ where: { id: taskId } });

    return res.status(200).json({ message: "Deleted task successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
