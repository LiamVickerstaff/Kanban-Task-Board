import { useState } from "react";
import styles from "./Dashboard.module.css";
import PrimaryBtn from "../../components/atoms/PrimaryBtn/PrimaryBtn";
import sampleTaskData from "../../sampleTaskData";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import type { ColumnType } from "../../types/taskTypes";

export default function Dashboard() {
  const [columnsData, setColumnsdata] = useState(sampleTaskData);

  return (
    <div className={styles.container}>
      {columnsData.length === 0 ? (
        <div className={styles.noColumnsGroup}>
          <p className={styles.emptyColumnsMessage}>
            This board is empty. Create a new column to get started.
          </p>
          <PrimaryBtn padInline={12} fontSize={1.5} padBlock={12}>
            + Add New Column
          </PrimaryBtn>
        </div>
      ) : (
        <div className={styles.populatedContainer}>
          {columnsData.map((column: ColumnType) => (
            <TaskColumn key={column.id} column={column} />
          ))}
        </div>
      )}
    </div>
  );
}
