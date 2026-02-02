import { create } from "zustand";

type SidebarStoreType = {
  isOpen: boolean;
  currentBoard: string;

  toggleSidebar: () => void;
  setCurrentBoard: (boardTitle: string) => void;
};

const useSidebarStore = create<SidebarStoreType>((set) => ({
  isOpen: false,
  currentBoard: "Platform Launch",

  toggleSidebar: () => {
    const currentOpenState = useSidebarStore.getState().isOpen;

    set({ isOpen: !currentOpenState });
  },

  setCurrentBoard: (boardTitle) => {
    set({
      currentBoard: boardTitle,
      isOpen: false,
    });
  },
}));

export default useSidebarStore;
