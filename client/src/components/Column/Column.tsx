import type { Column } from "../../types/dataTypes";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Column.module.css";

export default function Column({ column }: { column: Column }) {
  return (
    <div className={styles.container}>
      <div className={styles.columnTitle}>
        <div style={{ backgroundColor: "blue" }}></div>
        <h3 className="headingS">
          {column.title} ({column.tasks?.length})
        </h3>
      </div>
      <ul>
        {column.tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
