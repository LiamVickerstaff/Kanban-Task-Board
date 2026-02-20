import { Reorder, useDragControls } from "motion/react";
import useModalStore from "../../stores/useModalStore";
import type { Task } from "../../types/dataTypes";
import TaskItemInfo from "../TaskItemInfo/TaskItemInfo";
import styles from "./TaskItem.module.css";
import DragIcon from "../icons/DragIcon";
import { useEffect, useState, type RefObject } from "react";

export default function TaskItem({
  task,
  columnRef,
  onDragEnd,
}: {
  task: Task;
  columnRef: RefObject<null>;
  onDragEnd: () => void;
}) {
  const open = useModalStore((s) => s.open);
  const dragControls = useDragControls();

  const [isDragging, setIsDragging] = useState(false);

  const completedSubtasks = (task.subtasks ?? []).filter(
    (sub) => sub.complete,
  ).length;

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <Reorder.Item
      value={task.id}
      key={task.id}
      className={styles.container}
      dragConstraints={columnRef}
      onDragEnd={onDragEnd}
      dragElastic={0.1}
      dragControls={dragControls}
      animate={{
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? [0, -2, 2, 0] : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 25 },
        rotate: isDragging
          ? {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }
          : { duration: 0.2 },
      }}
    >
      <button
        className={styles.btn}
        onClick={() => open(<TaskItemInfo taskId={task.id} />)}
      >
        <h3 className="headingM">{task.title}</h3>
        <span className="bodyM">
          {completedSubtasks} of {task.subtasks?.length ?? 0} subtasks
        </span>
      </button>
      <div
        className={styles.dragIcon}
        onPointerDown={(e) => {
          dragControls.start(e);
          setIsDragging(true);
        }}
        onPointerUp={() => setIsDragging(false)}
        style={{ cursor: "grab" }}
      >
        <DragIcon />
      </div>
    </Reorder.Item>
  );
}
