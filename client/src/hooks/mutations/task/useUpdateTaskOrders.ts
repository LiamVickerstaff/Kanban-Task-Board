import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderOfTasks } from "../../../api/domains/tasksApi";
import type { Task, TaskOrder } from "../../../types/dataTypes";
import { useUserStore } from "../../../stores/useUserStore";

export const useUpdateTaskOrders = () => {
  const queryClient = useQueryClient();
  const currentBoardId = useUserStore((s) => s.currentBoardId);

  return useMutation({
    mutationFn: updateOrderOfTasks,

    onMutate: async ({ changedTasks }: { changedTasks: TaskOrder[] }) => {
      await queryClient.cancelQueries({ queryKey: ["board", currentBoardId] });

      const previousBoard = queryClient.getQueryData<any>([
        "board",
        currentBoardId,
      ]);

      queryClient.setQueryData(["board", currentBoardId], (oldBoard: any) => {
        if (!oldBoard) return oldBoard;
        const updatedColumnId = changedTasks[0]?.columnId;
        if (!updatedColumnId) return oldBoard;

        const newColumns = oldBoard.columns.map((col: any) => {
          if (col.id !== updatedColumnId) return col;

          const taskMap = Object.fromEntries(
            changedTasks.map((t) => [t.id, t]),
          );

          const updatedTasksInColumn = col.tasks.map((task: Task) =>
            taskMap[task.id]
              ? { ...task, order: taskMap[task.id].order }
              : task,
          );

          return {
            ...col,
            tasks: updatedTasksInColumn.sort(
              (a: Task, b: Task) => a.order - b.order,
            ),
          };
        });

        return { ...oldBoard, columns: newColumns };
      });

      return { previousBoard };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(
          ["board", currentBoardId],
          context.previousBoard,
        );
      }
    },

    onSuccess: (updatedTasks: Task[]) => {
      queryClient.setQueryData(["board", currentBoardId], (oldBoard: any) => {
        if (!oldBoard) return oldBoard;

        const newColumns = oldBoard.columns.map((col: any) => {
          const updatedTasksInColumn = col.tasks.map((task: Task) => {
            const updated = updatedTasks.find((t) => t.id === task.id);
            return updated ? updated : task;
          });

          return {
            ...col,
            tasks: updatedTasksInColumn.sort(
              (a: any, b: any) => a.order - b.order,
            ),
          };
        });

        return { ...oldBoard, columns: newColumns };
      });
    },
  });
};
