import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const boardOfId = await prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Successfully got board of id.",
      data: boardOfId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get board of id" });
  }
});

router.post("/new", async (req, res) => {
  const { title, columns, userId } = req.body;

  try {
    const createdBoard = await prisma.board.create({
      data: {
        title,
        columns: {
          create: columns.map((column: { title: string; order: number }) => ({
            title: column.title,
            order: column.order,
          })),
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        columns: true,
      },
    });

    return res
      .status(201)
      .json({ message: "Successfully created new board", createdBoard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create new board" });
  }
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const boardId = req.params.id;

  return res
    .status(200)
    .json({ message: `Updated board of id: ${boardId}`, data });
});

router.delete("/:id", async (req, res) => {
  const boardId = req.params.id;

  try {
    await prisma.board.delete({ where: { id: boardId } });
    return res.status(200).json({ message: `Deleted board of id: ${boardId}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed to delete board` });
  }
});

export default router;
