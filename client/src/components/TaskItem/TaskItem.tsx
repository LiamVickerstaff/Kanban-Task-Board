import type { TaskType } from "../../types/taskTypes";
import styles from "./TaskItem.module.css";


export default function TaskItem({task}: {task: TaskType}) {
  return (
    <button className={styles.container}>
      <h3>{task.title}</h3>
      <span>0 of {task.subtasks.length} subtasks</span>
    </button>
  );
}
