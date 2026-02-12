import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore";
import Button from "../../atoms/Buttons/Button/Button";
import styles from "./DeleteWarning.module.css";
import { useEffect } from "react";
import type { Board, TaskType } from "../../../types/dataTypes";
import { deleteBoard } from "../../../api/domains/boardsApi";
import { deleteTask } from "../../../api/domains/tasksApi";

export default function DeleteWarning({
  type,
  item,
}: {
  type: "board" | "task";
  item: Board | TaskType;
}) {
  const close = useModalStore((s) => s.close);

  useEffect(() => {
    console.log("item id:", item.id);
  }, [item]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn:
      type === "board" ? () => deleteBoard(item.id) : () => deleteTask(item.id),

    onSuccess: (data) => {
      if (type === "board") {
        queryClient.invalidateQueries({ queryKey: ["boards"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
      alert(data.message);
      close();
    },

    onError: (error) => {
      alert(`Failed to delete ${type} of id: ${item.id}. Error: ${error}`);
    },
  });

  return (
    <div className={styles.container}>
      <h2>Delete this {type}?</h2>
      <p>
        Are you sure you want to delete the <b>'{item.title}'</b> {type}? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={styles.btnGroup}>
        <Button
          type="button"
          style="danger"
          fullWidth={true}
          padBlock={0.8}
          callback={mutate}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
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
