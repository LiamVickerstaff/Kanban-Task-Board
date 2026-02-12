import useModalStore from "../../stores/useModalStore";
import type { TaskType } from "../../types/board";
import TaskItemInfo from "../TaskItemInfo/TaskItemInfo";
import styles from "./TaskItem.module.css";

export default function TaskItem({ task }: { task: TaskType }) {
  const open = useModalStore((s) => s.open);

  // useEffect(() => {
  //   console.log(task)
  // }, [task])

  return (
    <button
      className={styles.container}
      onClick={() => open(<TaskItemInfo task={task} />)}
    >
      <h3 className="headingM">{task.title}</h3>
      <span className="bodyM">0 of {task.subtasks.length} subtasks</span>
    </button>
  );
}
