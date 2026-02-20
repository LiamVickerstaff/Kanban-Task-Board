import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { createBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";
import type { Board } from "../../../types/dataTypes";

export const useCreateBoard = () => {
  const close = useModalStore((s) => s.close);
  const { id: userId, setCurrentBoardId } = useUserStore();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (newBoard) => {
      if (newBoard) {
        queryClient.setQueryData(["boards", userId], (old: Board[] = []) => [
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

// onMutate: async (newBoard) => {
//   console.log("newboard inside useCreateBoard mutation: ", newBoard);
//   await queryClient.cancelQueries({ queryKey: ["boards", userId] });

//   const previousUserBoards = queryClient.getQueryData<Board[]>([
//     "boards",
//     userId,
//   ]);

//   const previousBoardId = boardId;

//   queryClient.setQueryData(["boards", userId], (old: Board[] = []) => [
//     ...old,
//     newBoard,
//   ]);

//   const newBoardId = newBoard.id;
//   console.log("new board id inside useCreateBoard mutation: ", newBoardId);

//   queryClient.setQueryData(["board", newBoardId], newBoard);
//   setCurrentBoardId(newBoardId!);
//   close();

//   return { previousUserBoards, newBoardId, previousBoardId };
// },

// onError: (_err, _var, context) => {
//   if (context?.previousUserBoards) {
//     queryClient.setQueryData(
//       ["boards", userId],
//       context.previousUserBoards,
//     );
//   }

//   if (context?.newBoardId) {
//     queryClient.removeQueries({ queryKey: ["board", context?.newBoardId] });
//   }

//   if (context?.previousBoardId) {
//     setCurrentBoardId(context.previousBoardId);
//   }

//   alert("Failed to save new board");
// },

// onSettled: () => {
//   queryClient.invalidateQueries({ queryKey: ["boards", userId] });
// },
