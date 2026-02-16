import useModalStore from "../../../stores/useModalStore";
import Button from "../../atoms/Buttons/Button/Button";
import styles from "./DeleteWarning.module.css";
import { useDeleteTask } from "../../../hooks/mutations/task/useDeleteTask";
import { useDeleteBoard } from "../../../hooks/mutations/board/useDeleteBoard";
// import { useDeleteColumn } from "../../../hooks/mutations/column/useDeleteColumn";

export default function DeleteWarning({
  type,
  title,
  id,
}: {
  type: "task" | "board" | "column";
  title: string;
  id: string;
}) {
  const close = useModalStore((s) => s.close);

  const { mutate: mutateDeleteTask, isPending: deleteTaskIsPending } =
    useDeleteTask();
  const { mutate: mutateDeleteBoard, isPending: deleteBoardIsPending } =
    useDeleteBoard();
  // const { mutate: mutateDeleteColumn } = useDeleteColumn();

  return (
    <div className={styles.container}>
      <h2>Delete this {type}?</h2>
      <p>
        Are you sure you want to delete the '{title}' {type}? {message[type]}
      </p>
      <div className={styles.btnGroup}>
        <Button
          type="button"
          style="danger"
          fullWidth={true}
          padBlock={0.8}
          callback={
            type === "board"
              ? () => mutateDeleteBoard(id)
              : () => mutateDeleteTask(id)
            // : () => mutateDeleteColumn(id)
          }
          disabled={deleteBoardIsPending || deleteTaskIsPending}
        >
          {deleteBoardIsPending || deleteTaskIsPending
            ? "Deleting..."
            : "Delete"}
        </Button>
        <Button
          type="button"
          style="secondary"
          fullWidth={true}
          padBlock={0.8}
          callback={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

const message = {
  board:
    "This action will remove all columns and tasks and cannot be reversed.",
  task: "This action will permenantly delete the task.",
  column:
    "This action will remove the column as well as all tasks and subtasks belonging to it.",
};
