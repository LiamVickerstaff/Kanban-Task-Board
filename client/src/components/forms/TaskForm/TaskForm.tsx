import { FormProvider, useForm } from "react-hook-form";
// import styles from "./TaskForm.module.css";
import TextField from "../fields/TextField/TextField";
import TextAreaField from "../fields/TextAreaField/TextAreaField";
import type { TaskType } from "../../../types/taskTypes";
import Button from "../../atoms/Buttons/Button/Button";
import StatusDropdownField from "../fields/StatusDropdownField/StatusDropdownField";
import SubtasksField from "../fields/SubtasksField/SubtaskField";

export default function TaskForm({
  type,
  task,
}: {
  type: "Add" | "Edit";
  task?: TaskType;
}) {
  const methods = useForm<TaskType>({
    defaultValues: {
      id: task?.id ?? "",
      title: task?.title ?? "",
      description: task?.description ?? "",
      subtasks: task?.subtasks ?? [
        { title: "", complete: false },
        { title: "", complete: false },
      ],
      status: task?.status ?? "Todo",
    },
  });

  const onSubmit = (data: TaskType) => {
    console.log(`Submitting ${type} form: `, data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={`formContainer`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h2 className="headingL">{type} Task</h2>
        <TextField name="title" label="Title" />
        <TextAreaField name="description" label="Description" />
        <SubtasksField />
        <StatusDropdownField
          name="status"
          label="Status"
          options={["Todo", "Doing", "Completed"]}
        />
        <Button type="submit" fullWidth={true} padBlock={0.8} style="primary">
          Create Task
        </Button>
      </form>
    </FormProvider>
  );
}
