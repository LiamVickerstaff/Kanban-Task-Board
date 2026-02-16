import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/all/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const allBoards = await prisma.board.findMany({
      where: { userId: userId },
    });

    return res.status(200).json({
      message: "Successfully found all boards belonging to userId",
      data: allBoards,
    });
  } catch (error) {
    console.error("Failed to find all boards belonging to userId: ", error);
    return res.status(500).json({
      message: "Server error: tried fetching all boards of userId",
      error,
    });
  }
});

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
            tasks: {
              include: {
                subtasks: true,
              },
            },
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
    return res
      .status(500)
      .json({ message: "Failed to get board of id", error });
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
      .json({ message: "Successfully created new board", data: createdBoard });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create new board", error });
  }
});

router.put("/:id", async (req, res) => {
  const { title, columns } = req.body;
  const boardId = req.params.id;

  try {
    const existingBoard = await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: true,
      },
    });

    if (!existingBoard) {
      return res.status(404).json({
        message: "Board not found",
        error: "Failed to find board of id in the database",
      });
    }

    // Get all database existing column ids
    const existingColumnIds = existingBoard.columns.map((col) => col.id);
    // Get all ids of incoming columns to update
    const toUpdateColumnIds = columns
      .filter((col: any) => col.id)
      .map((col: any) => col.id);

    // columns ids to delete
    const columnsToDelete = existingColumnIds.filter(
      (id) => !toUpdateColumnIds.includes(id),
    );

    const updatedBoard = await prisma.board.update({
      where: { id: boardId },
      data: {
        title: title,
        columns: {
          deleteMany: {
            id: { in: columnsToDelete },
          },
          updateMany: columns
            .filter((col: any) => col.id)
            .map((col: any) => ({
              where: { id: col.id },
              data: {
                title: col.title,
                order: col.order,
              },
            })),
          create: columns
            .filter((col: any) => !col.id)
            .map((col: any) => ({
              title: col.title,
              order: col.order,
            })),
        },
      },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: `Updated board of id: ${boardId}`, data: updatedBoard });
  } catch (error) {
    console.error("Failed to update board: ", error);
    return res
      .status(500)
      .json({ message: "Failed to update board of id", error });
  }
});

router.delete("/:id", async (req, res) => {
  const boardId = req.params.id;

  try {
    const deletedBoard = await prisma.board.delete({ where: { id: boardId } });
    return res
      .status(200)
      .json({ message: `Deleted board of id: ${boardId}`, data: deletedBoard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Failed to delete board`, error });
  }
});

export default router;
