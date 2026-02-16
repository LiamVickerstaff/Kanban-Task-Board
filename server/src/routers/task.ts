import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        subtasks: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Successfully found task", data: task });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to find task of id", error });
  }
});

router.post("/new", async (req: Request, res: Response) => {
  const newTask = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title: newTask.title,
        description: newTask.description,
        order: newTask.order,
        columnId: newTask.columnId,

        subtasks: {
          create: newTask.subtasks,
        },
      },
      include: {
        subtasks: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully created new task", data: task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to save new task" });
  }
});

router.put("/change-status", async (req: Request, res: Response) => {
  const { taskId, newColumnId } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        columnId: newColumnId,
      },
    });

    return res
      .status(200)
      .json({
        message: `Updated subtasks for task: ${taskId}`,
        data: updatedTask,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to change status of task", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const data = req.body;
  const taskId = req.params.id as string;

  try {
    const savedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: data.title,
        description: data.description,
        order: data.order,
        columnId: data.columnId,
        subtasks: {
          deleteMany: {},
          create: data.subtasks.map((subtask: any) => ({
            title: subtask.title,
            complete: subtask.complete,
          })),
        },
      },
      include: {
        subtasks: true,
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

  if (typeof taskId !== "string")
    return res.status(500).json({ message: "Received invalid taskId" });

  try {
    const deletedTask = await prisma.task.delete({ where: { id: taskId } });

    return res
      .status(200)
      .json({ message: "Deleted task successfully", data: deletedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete task", error });
  }
});

export default router;
