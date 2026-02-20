import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { updateBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";
import type { Board } from "../../../types/dataTypes";

export const useUpdateBoard = () => {
  const close = useModalStore((s) => s.close);
  const { id: userId } = useUserStore();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateBoard,
    onMutate: async (updatedBoard) => {
      await queryClient.cancelQueries({ queryKey: ["board", updatedBoard.id] });

      const previousBoard = queryClient.getQueryData<Board>([
        "board",
        updatedBoard.id,
      ]);
      const previousBoards = queryClient.getQueryData<Board>([
        "boards",
        userId,
      ]);

      if (updatedBoard) {
        queryClient.setQueryData(["board", updatedBoard.id], updatedBoard);
        queryClient.setQueryData(["boards", userId], (old: Board[] = []) =>
          old.map((board) =>
            board.id === updatedBoard.id ? updatedBoard : board,
          ),
        );
      }

      close();

      return { previousBoard, previousBoards };
    },
    onError: (_err, _var, context) => {
      if (!context) return;

      if (context.previousBoard) {
        queryClient.setQueryData(
          ["board", context.previousBoard.id],
          context.previousBoard,
        );
      }
      if (context.previousBoards) {
        queryClient.setQueryData(["boards", userId], context.previousBoards);
      }

      alert("Failed to save board changes");
    },
  });

  return mutation;
};
