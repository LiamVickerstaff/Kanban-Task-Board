import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "../../../api/domains/tasksApi";
import { useUserStore } from "../../../stores/useUserStore";
import type { Board } from "../../../types/dataTypes";

export const useChangeTaskStatus = () => {
  const boardId = useUserStore((s) => s.currentBoardId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,
    onMutate: async ({ taskId, newColumnId }) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });

      const previousBoard = queryClient.getQueryData<Board>(["board", boardId]);

      queryClient.setQueryData<Board>(["board", boardId], (old) => {
        if (!old) return old;

        let movedTask: any = null;

        const columnsWithoutTask = old.columns?.map((col) => {
          const remainingTasks = col.tasks?.filter((task) => {
            if (task.id === taskId) {
              movedTask = { ...task, columnId: newColumnId };
              return false;
            }
            return true;
          });
          return { ...col, tasks: remainingTasks };
        });

        if (!movedTask) return old;

        const updatedColumns = columnsWithoutTask?.map((col) =>
          col.id === newColumnId
            ? { ...col, tasks: [...(col.tasks ?? []), movedTask] }
            : col,
        );

        return { ...old, columns: updatedColumns };
      });
      return { previousBoard };
    },

    onError: (_var, _err, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", boardId], context?.previousBoard);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });
};
