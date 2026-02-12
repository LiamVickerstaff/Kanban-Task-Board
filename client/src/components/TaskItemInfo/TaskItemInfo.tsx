import { FormProvider, useForm } from "react-hook-form";
import StatusDropdownField from "../forms/fields/StatusDropdownField/StatusDropdownField";
import styles from "./TaskItemInfo.module.css";
import KebabButton from "../atoms/Buttons/KebabButton/KebabButton";
import SubtaskItem from "../SubtaskItem/SubtaskItem";
import type { TaskType } from "../../types/board";

export default function TaskItemInfo({ task }: { task: TaskType }) {
  const methods = useForm({
    defaultValues: {
      status: "Todo",
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.titleGroup}>
        <h3 className={styles.title}>{task.title}</h3>
        <KebabButton type="Task" item={task} />
      </div>
      <p className={styles.description}>{task.description ?? "---"}</p>
      <div className={styles.subtaskGroup}>
        <p>Subtasks (2 of {task.subtasks.length})</p>
        <ul className={styles.subtaskList}>
          {task.subtasks.map((sub) => (
            <SubtaskItem key={sub.title} subtask={sub} />
          ))}
        </ul>
      </div>
      <FormProvider {...methods}>
        <StatusDropdownField
          name="status"
          label="Current Status"
          options={["Todo", "Doing", "Completed"]}
        />
      </FormProvider>
    </div>
  );
}
