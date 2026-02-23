import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { createBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";
import type { Board } from "../../../types/dataTypes";
import { useUser } from "@clerk/clerk-react";

export const useCreateBoard = () => {
  const close = useModalStore((s) => s.close);
  const { setCurrentBoardId } = useUserStore();
  const { user } = useUser();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (newBoard) => {
      if (newBoard) {
        queryClient.setQueryData(["boards", user?.id], (old: Board[] = []) => [
          ...old,
          newBoard,
        ]);
        queryClient.setQueryData(["board", newBoard.id], newBoard);
        setCurrentBoardId(newBoard.id);
        close();
      }
    },
    onError: (error) => {
      alert("Failed to create a new board, please try again.");
      console.error(error);
    },
  });

  return mutation;
};
