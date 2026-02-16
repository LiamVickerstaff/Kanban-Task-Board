import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "../../../api/domains/subtasksApi";
import type { Board, Column, Task } from "../../../types/dataTypes";
import { useUserStore } from "../../../stores/useUserStore";

export const useToggleSubtaskCompleted = () => {
  const queryClient = useQueryClient();
  const boardId = useUserStore((s) => s.currentBoardId);

  const mutate = useMutation({
    mutationFn: updateSubtask,
    onMutate: async (updatedSubtask) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });

      const previousBoard = queryClient.getQueryData(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (old: Board) => {
        if (!old) return old;

        return {
          ...old,
          columns: old.columns?.map((col: Column) => ({
            ...col,
            tasks: col.tasks?.map((task: Task) => ({
              ...task,
              subtasks: task.subtasks.map((sub: any) =>
                sub.id === updatedSubtask.id
                  ? { ...sub, complete: updatedSubtask.complete }
                  : sub,
              ),
            })),
          })),
        };
      });
      return { previousBoard };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(["board", boardId], context.previousBoard);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });

  return mutate;
};
