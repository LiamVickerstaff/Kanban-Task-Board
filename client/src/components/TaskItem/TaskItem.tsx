import useModalStore from "../../stores/useModalStore";
import type { Task } from "../../types/dataTypes";
import TaskItemInfo from "../TaskItemInfo/TaskItemInfo";
import styles from "./TaskItem.module.css";

export default function TaskItem({ task }: { task: Task }) {
  const open = useModalStore((s) => s.open);

  const numOfCompletedSubtasks =
    task.subtasks.map((sub) => sub.complete === true).length ?? 0;

  return (
    <button
      className={styles.container}
      onClick={() => open(<TaskItemInfo taskId={task.id} />)}
    >
      <h3 className="headingM">{task.title}</h3>
      <span className="bodyM">
        {numOfCompletedSubtasks} of {task.subtasks?.length ?? 0} subtasks
      </span>
    </button>
  );
}
