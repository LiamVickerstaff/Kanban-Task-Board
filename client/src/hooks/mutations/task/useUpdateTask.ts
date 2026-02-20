import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../stores/useUserStore";
import useModalStore from "../../../stores/useModalStore";
import { updateTask } from "../../../api/domains/tasksApi";
import type { Board } from "../../../types/dataTypes";

export const useUpdateTask = () => {
  const boardId = useUserStore((s) => s.currentBoardId);
  const close = useModalStore((s) => s.close);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTask,

    onMutate: async (updatedTask) => {
      if (!updatedTask) return;

      await queryClient.cancelQueries({ queryKey: ["board", boardId] });

      const previousBoard = queryClient.getQueryData(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (old: Board) => {
        if (!old) return old;

        const newColumns = (old.columns ?? []).map((col) => {
          // Remove the task from any column that isn't the new column
          let updatedTasks = (col.tasks ?? []).filter(
            (task) => task.id !== updatedTask.id,
          );

          // If this is the target column, add the updatedTask
          if (col.id === updatedTask.columnId) {
            updatedTasks = [...updatedTasks, updatedTask];
          }

          // Sort tasks by order if needed
          updatedTasks.sort((a, b) => a.order - b.order);

          return { ...col, tasks: updatedTasks };
        });

        return { ...old, columns: newColumns };
      });

      close();

      return { previousBoard };
    },
    onError: (_err, _var, context) => {
      alert(`Failed to update task. Please try again.`);
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", boardId], context?.previousBoard);
      }
    },
  });

  return mutation;
};
