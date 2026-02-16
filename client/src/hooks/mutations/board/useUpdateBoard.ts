import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { updateBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";

export const useUpdateBoard = () => {
  const close = useModalStore((s) => s.close);
  const boardId = useUserStore((s) => s.currentBoardId);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBoard,
    onSuccess: (updateBoard) => {
      console.log("useUpdateBoard got this board: ", updateBoard);
      queryClient.setQueryData(["board", boardId], updateBoard);
      close();
    },
    onError: () => {
      alert("Failed to save board changes");
    },
  });

  return mutation;
};
