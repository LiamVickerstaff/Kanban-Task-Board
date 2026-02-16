import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/useUserStore";
import useModalStore from "../../../stores/useModalStore";
import { updateTask } from "../../../api/domains/tasksApi";

export const useUpdateTask = () => {
  const boardId = useUserStore((s) => s.currentBoardId);
  const close = useModalStore((s) => s.close);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      close();
    },
    onError: (error) => {
      console.error(error);
      alert(`Failed to update task. Please try again.`);
    },
  });

  return mutation;
};
