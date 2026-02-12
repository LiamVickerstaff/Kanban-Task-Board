import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (!userId)
    return res.status(404).json({
      message: "Request did not include valid userId",
      error: "Invalid or missing userId",
    });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        boards: true,
      },
    });

    return res.status(200).json({ message: "Found user", data: user });
  } catch (error) {
    console.error("Failed to get user: ", error);
    return res.status(500).json({
      message: "Failed to get user",
      error,
    });
  }
});

router.post("/new", async (req, res) => {
  const { email, username } = req.body;

  if (!email || !username) {
    return res.status(404).json({
      message: "Request did not include valid request body",
      error: "Invalid or missing email or username",
    });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
      },
      include: {
        boards: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully created user", data: newUser });
  } catch (error) {
    console.error("Failed to create user: ", error);
    return res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const changedUserData = req.body;

  if (!userId) {
    return res.status(404).json({
      message: "Request did not include valid userId",
      error: "Invalid or missing userId",
    });
  }

  if (!changedUserData) {
    return res.status(404).json({
      message: "Request did not include user data to change",
      error: "Invalid or missing user body",
    });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: changedUserData.username,
      },
      include: {
        boards: true,
      },
    });

    return res
      .status(200)
      .json({ message: "Successfully updated user", data: updatedUser });
  } catch (error) {
    console.error("Failed to update user: ", error);
    return res.status(500).json({
      message: "Failed to update user",
      error,
    });
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(404).json({
      message: "Request did not include valid userId",
      error: "Invalid or missing userId",
    });
  }

  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });

    return res
      .status(200)
      .json({ message: "Successfully deleted user", data: user });
  } catch (error) {
    console.error("Failed to update user: ", error);
    return res.status(500).json({
      message: "Failed to update user",
      error,
    });
  }
});

export default router;
