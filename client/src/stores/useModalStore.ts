import type { ReactNode } from "react";
import { create } from "zustand";

type ModalStoreType = {
  isOpen: boolean;
  content: ReactNode | null;

  open: (content: ReactNode) => void;
  close: () => void;
};

const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  content: null,

  open: (content) => {
    console.log("opened modal");

    set({
      isOpen: true,
      content,
    });
  },

  close: () => {
    set({
      isOpen: false,
      content: null,
    });
  },
}));

export default useModalStore;
