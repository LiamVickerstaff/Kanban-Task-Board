import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { createBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";

export const useCreateBoard = () => {
  const close = useModalStore((s) => s.close);
  const { id: userId, setCurrentBoardId } = useUserStore();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (newBoard) => {
      console.log("newBoard from onSuccess: ", newBoard);
      queryClient.setQueryData(["boards", userId], (old: any[] = []) => [
        ...old,
        newBoard,
      ]);
      setCurrentBoardId(newBoard.id);
      close();
    },
    onError: () => {
      alert("Failed to save board changes");
    },
  });

  return mutation;
};
