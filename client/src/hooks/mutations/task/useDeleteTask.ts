import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/useUserStore";
import useModalStore from "../../../stores/useModalStore";
import { deleteTask } from "../../../api/domains/tasksApi";
import type { Board, Task } from "../../../types/dataTypes";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const boardId = useUserStore((s) => s.currentBoardId);
  const close = useModalStore((s) => s.close);
  const mutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: (data: Task) => {
      queryClient.setQueryData(["board", boardId], (oldData: Board) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          columns: oldData.columns?.map((col) =>
            col.id === data.columnId
              ? {
                  ...col,
                  tasks: col.tasks?.filter((task) => task.id !== data.id) ?? [],
                }
              : col,
          ),
        };
      });
      close();
    },

    onError: (error) => {
      alert(`Failed to delete task. Error: ${error}`);
    },
  });

  return mutation;
};
