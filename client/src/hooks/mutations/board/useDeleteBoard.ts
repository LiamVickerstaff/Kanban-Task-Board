import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { deleteBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";
import type { Board } from "../../../types/dataTypes";
import { useUser } from "@clerk/clerk-react";

export const useDeleteBoard = () => {
  const close = useModalStore((s) => s.close);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { setCurrentBoardId } = useUserStore();

  const mutation = useMutation({
    mutationFn: deleteBoard,

    onSuccess: (deletedBoard) => {
      // Remove cache of deletedBoard
      queryClient.removeQueries({ queryKey: ["board", deletedBoard.id] });

      // Update user's boards cache
      queryClient.setQueryData(
        ["boards", user?.id],
        (old: Board[] = []) =>
          old?.filter((b) => b.id !== deletedBoard.id) ?? [],
      );

      // Get latest updatedBoards from cache
      const updatedBoards =
        queryClient.getQueryData<any[]>(["boards", user?.id]) ?? [];

      console.log(
        "current boards inside [`boards`, userId] cache: ",
        updatedBoards,
      );

      setCurrentBoardId(updatedBoards[0].id ?? "");
      close();
    },

    onError: (error) => {
      alert(`Failed to delete board. Error: ${error}`);
    },
  });

  return mutation;
};
