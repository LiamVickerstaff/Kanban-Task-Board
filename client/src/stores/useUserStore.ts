import { create } from "zustand";

type UserStore = {
  currentBoardId: string;

  reset: () => void;

  setCurrentBoardId: (boardId: string) => void;
};

export const useUserStore = create<UserStore>()((set) => ({
  currentBoardId: "",

  reset: () =>
    set({
      currentBoardId: "",
    }),

  setCurrentBoardId: (boardId) => {
    set({
      currentBoardId: boardId,
    });
  },
}));
