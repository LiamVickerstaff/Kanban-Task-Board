import { Reorder } from "motion/react";
import type { Column, Task, TaskOrder } from "../../types/dataTypes";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./Column.module.css";
import { useEffect, useRef, useState } from "react";
import { useUpdateTaskOrders } from "../../hooks/mutations/task/useUpdateTaskOrders";

export default function Column({ column }: { column: Column }) {
  const { mutate: mutateTaskOrders } = useUpdateTaskOrders();

  const [tasks, setTasks] = useState(column.tasks ?? []);
  const columnRef = useRef(null);

  useEffect(() => {
    setTasks(column.tasks ?? []);
  }, [column.tasks]);

  const handleReorder = (newOrderIds: string[]) => {
    const newTasks = newOrderIds.map((id, index) => {
      const t = tasks.find((task) => task.id === id)!;
      return { ...t, order: index };
    });

    setTasks(newTasks);
  };

  const handleDrop = () => {
    console.log("user dropped the item");

    // Reassign the correct order value to items that have moved
    const newTaskOrder: TaskOrder[] = tasks.map((task, index) => ({
      id: task.id,
      order: index,
      columnId: task.columnId,
    }));

    // Get only the items that have moved
    const changedTasks: TaskOrder[] = newTaskOrder.filter(
      (task) =>
        task.order !== column.tasks?.find((t) => t.id === task.id)?.order,
    );

    console.log("changed tasks: ", changedTasks);

    if (changedTasks.length === 0) return;

    mutateTaskOrders({ changedTasks });
  };

  return (
    <div className={styles.container}>
      <div className={styles.columnTitle}>
        <div className={styles.columnDot}></div>
        <h3 className="headingS">
          {column.title} ({column.tasks?.length})
        </h3>
      </div>
      <Reorder.Group
        ref={columnRef}
        axis="y"
        values={tasks.map((t) => t.id)}
        dragConstraints={{ bottom: 0 }}
        onReorder={(newOrderIds) => handleReorder(newOrderIds)}
      >
        {tasks?.map((task) => (
          <TaskItem
            task={task}
            key={task.id}
            columnRef={columnRef}
            onDragEnd={handleDrop}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
