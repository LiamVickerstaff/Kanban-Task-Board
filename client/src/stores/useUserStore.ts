import { create } from "zustand";
import type { Board, User } from "../types/dataTypes";

type UserStore = {
  id: string;
  email: string;
  username: string;
  boards: Board[] | [];

  currentBoard: Board;

  setUser: (user: User) => void;
  reset: () => void;

  setCurrentBoard: (board: Board) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  id: "",
  email: "",
  username: "",
  boards: [],

  currentBoard: {
    id: "",
    title: "",
  },

  setUser: (user) =>
    set({
      id: user.id,
      email: user.email,
      username: user.username,
      boards: user.boards,
      currentBoard: {
        id: user.boards[0]?.id ?? "",
        title: user.boards[0]?.title ?? "",
      },
    }),

  reset: () => set({ id: "", email: "", username: "", boards: [] }),

  setCurrentBoard: (board) => {
    set({
      currentBoard: {
        id: board.id,
        title: board.title,
      },
    });
  },
}));
