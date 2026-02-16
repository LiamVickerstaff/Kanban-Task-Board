import styles from "./SubtaskItem.module.css";
import TickMark from "../icons/TickMark";
import type { Subtask } from "../../types/dataTypes";
import { useToggleSubtaskCompleted } from "../../hooks/mutations/subtask/useToggleSubtaskCompleted";

export default function SubtaskItem({ subtask }: { subtask: Subtask }) {
  const { mutate } = useToggleSubtaskCompleted();

  const handleToggleComplete = () => {
    const newCompleted = !subtask.complete;

    mutate({ ...subtask, complete: newCompleted });
  };

  return (
    <li
      className={`${styles.container} ${subtask.complete ? styles.complete : ""}`}
    >
      <button className={styles.button} onClick={handleToggleComplete}>
        <div className={styles.checkbox}>
          {subtask.complete ? <TickMark /> : ""}
        </div>
        <span className={styles.buttonText}>{subtask.title}</span>
      </button>
    </li>
  );
}
