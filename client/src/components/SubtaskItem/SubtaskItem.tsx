import { useState } from "react";
import styles from "./SubtaskItem.module.css";
import TickMark from "../icons/TickMark";
import type { SubtaskType } from "../../types/board";

export default function SubtaskItem({ subtask }: { subtask: SubtaskType }) {
  const [isComplete, setIsComplete] = useState(subtask.complete);

  return (
    <li className={`${styles.container} ${isComplete ? styles.complete : ""}`}>
      <button
        className={styles.button}
        onClick={() => setIsComplete((prev) => !prev)}
      >
        <div className={styles.checkbox}>{isComplete ? <TickMark /> : ""}</div>
        <span className={styles.buttonText}>{subtask.title}</span>
      </button>
    </li>
  );
}
