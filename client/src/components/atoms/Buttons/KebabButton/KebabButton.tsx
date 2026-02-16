import styles from "./KebabButton.module.css";
import KebabIcon from "../../../icons/KebabIcon";
import { useState } from "react";
import useModalStore from "../../../../stores/useModalStore";
import BoardForm from "../../../forms/BoardForm/BoardForm";
import DeleteWarning from "../../../modals/DeleteWarning/DeleteWarning";
import TaskForm from "../../../forms/TaskForm/TaskForm.js";
import type { Board, Task } from "../../../../types/dataTypes.js";

export default function KebabButton({
  type,
  item,
  disabled = false,
}: {
  type: "Task" | "Board";
  item: Board | Task;
  disabled?: boolean;
}) {
  const open = useModalStore((s) => s.open);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (formType: "edit" | "delete") => {
    if (type === "Task") {
      if (formType === "edit") {
        open(<TaskForm type="Edit" task={item as Task} />);
      } else {
        open(<DeleteWarning type="task" id={item.id} title={item.title} />);
      }
    } else if (type === "Board") {
      if (formType === "edit") {
        open(<BoardForm type="Edit" />);
      } else {
        open(<DeleteWarning type="board" id={item.id} title={item.title} />);
      }
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn}`}
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
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
