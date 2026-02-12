import styles from "./KebabButton.module.css";
import KebabIcon from "../../../icons/KebabIcon";
import { useState } from "react";
import useModalStore from "../../../../stores/useModalStore";
import BoardForm from "../../../forms/BoardForm/BoardForm";
import DeleteWarning from "../../../modals/DeleteWarning/DeleteWarning";
import TaskForm from "../../../forms/TaskForm/TaskForm.js";
import type { BoardType, TaskType } from "../../../../types/board.js";

export default function KebabButton({
  type,
  item,
}: {
  type: "Task" | "Board";
  item: BoardType | TaskType;
}) {
  const open = useModalStore((s) => s.open);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (formType: "edit" | "delete") => {
    if (type === "Task") {
      if (formType === "edit") {
        open(<TaskForm type="Edit" task={item as TaskType} />);
      } else {
        open(<DeleteWarning type="task" item={item as TaskType} />);
      }
    } else {
      if (formType === "edit") {
        open(<BoardForm type="Edit" board={item as BoardType} />);
      } else {
        open(<DeleteWarning type="board" item={item as BoardType} />);
      }
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <KebabIcon />
      </button>
      {isOpen && (
        <div className={styles.kebabDropdown}>
          <button
            className={styles.editBtn}
            onClick={() => handleClick("edit")}
          >{`Edit ${type}`}</button>
          <button
            className={styles.deleteBtn}
            onClick={() => handleClick("delete")}
          >{`Delete ${type}`}</button>
        </div>
      )}
    </div>
  );
}
