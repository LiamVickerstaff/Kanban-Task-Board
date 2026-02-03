import { FormProvider, useForm } from "react-hook-form";
// import styles from "./AddTaskForm.module.css";
import TextField from "../fields/TextField/TextField";
import TextAreaField from "../fields/TextAreaField/TextAreaField";
import type { TaskType } from "../../../types/taskTypes";
import SubtasksField from "../fields/SubtasksField/SubtaskField";
import Button from "../../atoms/Buttons/Button/Button";
import StatusDropdownField from "../fields/StatusDropdownField/StatusDropdownField";

export default function AddTaskForm() {
  const methods = useForm<TaskType>({
    defaultValues: {
      title: "",
      description: "",
      subtasks: [
        { title: "", complete: false },
        { title: "", complete: false },
      ],
      status: "Todo",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="formContainer" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="headingL">Add New Task</h2>
        <TextField name="title" label="Title" />
        <TextAreaField name="description" label="Description" />
        <SubtasksField />
        <StatusDropdownField
          name="status"
          label="Status"
          options={["Todo", "Doing", "Completed"]}
        />
        <Button fullWidth={true} padBlock={0.8} style="primary">
          Create Task
        </Button>
      </form>
    </FormProvider>
  );
}
