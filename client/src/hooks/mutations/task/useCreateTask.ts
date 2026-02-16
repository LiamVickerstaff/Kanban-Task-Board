import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/useUserStore";
import useModalStore from "../../../stores/useModalStore";
import { createTask } from "../../../api/domains/tasksApi";
import type { Board } from "../../../types/dataTypes";

export const useCreateTask = () => {
  const boardId = useUserStore((s) => s.currentBoardId);
  const close = useModalStore((s) => s.close);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["board", boardId], (oldData: Board) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          columns: oldData.columns?.map((col) =>
            col.id === newTask.columnId
              ? { ...col, tasks: [...col.tasks!, newTask] }
              : col,
          ),
        };
      });
      close();
    },
    onError: (error) => {
      console.error(error);
      alert(`Failed to create task. Please try again.`);
    },
  });

  return mutation;
};
