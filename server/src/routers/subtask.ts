import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.put("/:id", async (req, res) => {
  const subtaskBody = req.body;
  const subtaskId = req.params.id;

  try {
    const updatedSubtask = await prisma.subtask.update({
      where: { id: subtaskId },
      data: subtaskBody,
    });

    console.log("Updated subtask: ", updatedSubtask);

    return res
      .status(200)
      .json({ message: "Successfully updated subtask", data: updatedSubtask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update subtask", error });
  }
});

export default router;
