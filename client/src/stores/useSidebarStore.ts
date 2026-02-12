import { create } from "zustand";

type SidebarStoreType = {
  isOpen: boolean;

  toggleSidebar: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
};

const useSidebarStore = create<SidebarStoreType>((set) => ({
  isOpen: false,

  toggleSidebar: () => {
    const currentOpenState = useSidebarStore.getState().isOpen;

    set({ isOpen: !currentOpenState });
  },

  openSideBar: () => set({ isOpen: true }),
  closeSideBar: () => set({ isOpen: false }),
}));

export default useSidebarStore;
