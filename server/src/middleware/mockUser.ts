import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export const mockUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user = await prisma.user.findUnique({
      where: { id: "1234abc" },
    });

    if (!user) {
      user = await prisma.user.create({ data: userSeedData });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Mock user middleware error:", error);
    return res.status(500).json({ message: "Failed to initialize user" });
  }
};

const userSeedData = {
  id: "1234abc",
  username: "Mock User",
  boards: {
    create: [
      {
        title: "Welcome Board",
        columns: {
          create: [
            {
              title: "Todo",
              order: 0,
              tasks: {
                create: [
                  {
                    title: "Welcome to your Kanban board!",
                    order: 0,
                    status: "Todo",
                    subtasks: {
                      create: [
                        {
                          title: "Check out the app",
                          complete: true,
                        },
                        {
                          title: "Test the buttons",
                          complete: false,
                        },
                      ],
                    },
                  },
                  {
                    title: "Pat your dog",
                    order: 1,
                    status: "Todo",
                  },
                ],
              },
            },
            {
              title: "Doing",
              order: 1,
              tasks: {
                create: [
                  {
                    title: "Get Comfortable With The Dashboard",
                    order: 0,
                    status: "Doing",
                  },
                  {
                    title: "Drink Coffee",
                    order: 1,
                    status: "Doing",
                  },
                ],
              },
            },
            {
              title: "Done",
              order: 2,
              tasks: {
                create: [
                  {
                    title: "Go For A Swim",
                    order: 0,
                    status: "Done",
                  },
                ],
              },
            },
          ],
        },
      },
      {
        title: "Platform Launch",
        columns: {
          create: [
            {
              title: "Todo",
              order: 0,
              tasks: {
                create: [
                  {
                    title: "Medidate",
                    order: 0,
                    status: "Todo",
                  },
                  {
                    title: "Read Whiteboard",
                    order: 1,
                    status: "Todo",
                  },
                ],
              },
            },
            {
              title: "Doing",
              order: 1,
              tasks: {
                create: [
                  {
                    title: "Find A Duck In The Wild",
                    order: 0,
                    status: "Doing",
                  },
                  {
                    title: "Drink Orange Juice",
                    order: 1,
                    status: "Doing",
                  },
                ],
              },
            },
            {
              title: "Done",
              order: 2,
              tasks: {
                create: [
                  {
                    title: "Take A Walk",
                    order: 0,
                    status: "Done",
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
