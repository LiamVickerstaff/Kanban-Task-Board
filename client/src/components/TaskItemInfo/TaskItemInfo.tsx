import { FormProvider, useForm } from "react-hook-form";
import StatusDropdownField from "../forms/fields/StatusDropdownField/StatusDropdownField";
import styles from "./TaskItemInfo.module.css";
import KebabButton from "../atoms/Buttons/KebabButton/KebabButton";
import SubtaskItem from "../SubtaskItem/SubtaskItem";
import { useGetCurrentBoard } from "../../hooks/queries/board/useGetCurrentBoard";
import { useChangeTaskStatus } from "../../hooks/mutations/task/useChangeTaskStatus";

export default function TaskItemInfo({ taskId }: { taskId: string }) {
  const { data: boardData } = useGetCurrentBoard();
  const { mutate } = useChangeTaskStatus();

  if (!boardData) return null;

  const task = boardData.columns
    ?.flatMap((col) => col.tasks ?? [])
    .find((t) => t.id === taskId);

  if (!task) return null;

  const methods = useForm<{
    columnId: string;
  }>({
    defaultValues: {
      columnId: task.columnId,
    },
  });

  const handleOnStatusChange = (newColumnId: string) => {
    if (newColumnId !== task.columnId) {
      mutate({
        taskId: task.id,
        newColumnId,
      });
    }
  };

  const completedSubtasks = (task.subtasks ?? []).filter(
    (sub) => sub.complete,
  ).length;

  return (
    <div className={styles.container}>
      <div className={styles.titleGroup}>
        <h3 className={styles.title}>{task.title}</h3>
        <KebabButton type="Task" item={task} />
      </div>
      <p className={styles.description}>{task.description ?? "---"}</p>
      <div className={styles.subtaskGroup}>
        <p>
          Subtasks ({completedSubtasks} of {task.subtasks.length ?? 0})
        </p>
        <ul className={styles.subtaskList}>
          {task.subtasks.map((sub) => (
            <SubtaskItem key={sub.title} subtask={sub} />
          ))}
        </ul>
      </div>
      <FormProvider {...methods}>
        <StatusDropdownField
          name="columnId"
          label="Current Status"
          options={(boardData?.columns ?? []).map((column) => ({
            label: column.title,
            value: column.id,
          }))}
          onStatusChange={handleOnStatusChange}
        />
      </FormProvider>
    </div>
  );
}
