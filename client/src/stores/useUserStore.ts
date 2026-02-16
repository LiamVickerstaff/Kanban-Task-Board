import { create } from "zustand";
import type { User } from "../types/dataTypes";

type UserStore = {
  id: string;
  email: string;
  username: string;
  boardIds: string[];

  currentBoardId: string;

  setUser: (user: User) => void;
  reset: () => void;

  setCurrentBoardId: (boardId: string) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  id: "",
  email: "",
  username: "",
  boardIds: [],

  currentBoardId: "",

  setUser: (user) =>
    set({
      id: user.id,
      email: user.email,
      username: user.username,
      boardIds: user.boards.map((board) => board.title),
      currentBoardId: user.boards[0].id,
    }),

  reset: () =>
    set({
      id: "",
      email: "",
      username: "",
      boardIds: [],
      currentBoardId: "",
    }),

  setCurrentBoardId: (boardId) => {
    set({
      currentBoardId: boardId,
    });
  },
}));
