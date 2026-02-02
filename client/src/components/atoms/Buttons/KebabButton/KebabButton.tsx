import styles from "./KebabButton.module.css";
import KebabIcon from "../../../icons/KebabIcon";
import { useState } from "react";
import useModalStore from "../../../../stores/useModalStore";
import BoardForm from "../../../forms/BoardForm/BoardForm";
import EditTaskForm from "../../../forms/EditTaskForm/EditTaskForm";
import type { TaskType } from "../../../../types/taskTypes";
import DeleteWarning from "../../../modals/DeleteWarning/DeleteWarning";
import { boardData } from "../../../../sampleTaskData.js";

export default function KebabButton({
  type,
  task,
}: {
  type: "Task" | "Board";
  task?: TaskType;
}) {
  const open = useModalStore((s) => s.open);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (formType: "edit" | "delete") => {
    if (type === "Task") {
      if (formType === "edit") {
        open(<EditTaskForm task={task!} />);
      } else {
        open(<DeleteWarning type="task" title={task?.title!} />);
      }
    } else {
      if (formType === "edit") {
        open(<BoardForm type="Edit" />);
      } else {
        open(<DeleteWarning type="board" title={boardData.title} />);
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
