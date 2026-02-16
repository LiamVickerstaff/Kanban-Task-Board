import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import { deleteBoard } from "../../../api/domains/boardsApi";
import { useUserStore } from "../../../stores/useUserStore";

export const useDeleteBoard = () => {
  const close = useModalStore((s) => s.close);
  const queryClient = useQueryClient();

  const { setCurrentBoardId, id: userId } = useUserStore();

  const mutation = useMutation({
    mutationFn: deleteBoard,

    onSuccess: (deletedBoard) => {
      // Remove cache of deletedBoard
      queryClient.removeQueries({ queryKey: ["board", deletedBoard.id] });

      // Update user's boards cache
      queryClient.setQueryData(
        ["boards", userId],
        (old: any[] | undefined) =>
          old?.filter((b) => b.id !== deletedBoard.id) ?? [],
      );

      // Get latest updatedBoards from cache
      const updatedBoards =
        queryClient.getQueryData<any[]>(["boards", userId]) ?? [];

      setCurrentBoardId(updatedBoards[0].title ?? "");
      close();
    },

    onError: (error) => {
      alert(`Failed to delete board. Error: ${error}`);
    },
  });

  return mutation;
};
