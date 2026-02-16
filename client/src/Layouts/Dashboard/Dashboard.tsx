import styles from "./Dashboard.module.css";
import TaskColumn from "../../components/Column/Column";
import Button from "../../components/atoms/Buttons/Button/Button";
import BoardForm from "../../components/forms/BoardForm/BoardForm";
import useModalStore from "../../stores/useModalStore";
import type { Column } from "../../types/dataTypes";
import { useUserStore } from "../../stores/useUserStore";
import { useGetCurrentBoard } from "../../hooks/queries/board/useGetCurrentBoard";

export default function Dashboard() {
  const open = useModalStore((s) => s.open);
  const boardId = useUserStore((s) => s.currentBoardId);

  const {
    data: boardData,
    isPending: boardIsPending,
    isError: boardHasError,
  } = useGetCurrentBoard();

  // TSX if no board selected
  if (!boardId) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>Select a board</p>
      </div>
    );
  }

  // TSX if query pending
  if (boardIsPending) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>Loading...</p>
      </div>
    );
  }

  // TSX if query error
  if (boardHasError) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyColumnsMessage}>Error loading board.</p>
      </div>
    );
  }

  // TSX if there's no columns in the board
  if (!boardData || !boardData.columns || boardData.columns.length === 0) {
    return (
      <div className={styles.container}>
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
      </div>
    );
  }

  // TSX if there are columns in the board
  return (
    <div className={styles.container}>
      <div className={styles.populatedContainer}>
        {boardData.columns.map((column: Column) => (
          <TaskColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}
