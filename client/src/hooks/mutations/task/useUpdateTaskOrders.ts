import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderOfTasks } from "../../../api/domains/tasksApi";
import type { Task, TaskOrder } from "../../../types/dataTypes";

export const useUpdateTaskOrders = (boardId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderOfTasks,

    // 1️⃣ Optimistically update the cache
    onMutate: async ({ changedTasks }: { changedTasks: TaskOrder[] }) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });

      // Snapshot previous board data in case we need to roll back
      const previousBoard = queryClient.getQueryData<any>(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (oldBoard: any) => {
        if (!oldBoard) return oldBoard;
        const updatedColumnId = changedTasks[0]?.columnId; // assuming TaskOrder includes columnId
        if (!updatedColumnId) return oldBoard;

        const newColumns = oldBoard.columns.map((col: any) => {
          if (col.id !== updatedColumnId) return col; // leave other columns untouched

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

      // Return snapshot to allow rollback in case of error
      return { previousBoard };
    },

    // 2️⃣ Rollback on error
    onError: (_err, _variables, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", boardId], context.previousBoard);
      }
    },

    // 3️⃣ Sync cache with server response on success
    onSuccess: (updatedTasks: Task[]) => {
      queryClient.setQueryData(["board", boardId], (oldBoard: any) => {
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
