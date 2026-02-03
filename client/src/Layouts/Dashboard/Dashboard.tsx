import { useState } from "react";
import styles from "./Dashboard.module.css";
import sampleTaskData from "../../sampleTaskData";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import type { ColumnType } from "../../types/taskTypes";
import Button from "../../components/atoms/Buttons/Button/Button";
import BoardForm from "../../components/forms/BoardForm/BoardForm";
import useModalStore from "../../stores/useModalStore";

export default function Dashboard() {
  const open = useModalStore((s) => s.open);
  const [columnsData, setColumnsdata] = useState(sampleTaskData);

  return (
    <div className={styles.container}>
      {columnsData.length === 0 ? (
        <div className={styles.noColumnsGroup}>
          <p className={styles.emptyColumnsMessage}>
            This board is empty. Create a new column to get started.
          </p>
          <Button
            padInline={1.2}
            style="primary"
            size="large"
            callback={() => open(<BoardForm type="Edit" />)}
          >
            + Add New Column
          </Button>
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
