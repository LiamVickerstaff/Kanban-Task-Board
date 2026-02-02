import { FormProvider, useForm } from "react-hook-form";
import styles from "./EditTaskForm.module.css";
import TextField from "../fields/TextField/TextField";
import TextAreaField from "../fields/TextAreaField/TextAreaField";
import type { TaskType } from "../../../types/taskTypes";
import Button from "../../atoms/Buttons/Button/Button";
import StatusDropdownField from "../fields/StatusDropdownField/StatusDropdownField";
import SubtasksField from "../fields/SubtasksField/SubtaskField";

export default function EditTaskForm({ task }: { task: TaskType }) {
  const methods = useForm<TaskType>({
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
      status: task.status,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.formContainer}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h2>Edit Task</h2>
        <TextField name="title" label="Title" />
        <TextAreaField name="description" label="Description" />
        <SubtasksField />
        <StatusDropdownField
          name="status"
          label="Status"
          options={["Todo", "Doing", "Completed"]}
        />
        <Button fontSize={1.3} fullWidth={true} padBlock={0.8} style="primary">
          Create Task
        </Button>
      </form>
    </FormProvider>
  );
}
