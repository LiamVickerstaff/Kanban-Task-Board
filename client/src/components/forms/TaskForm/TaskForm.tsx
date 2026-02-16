import { FormProvider, useForm } from "react-hook-form";
// import styles from "./TaskForm.module.css";
import TextField from "../fields/TextField/TextField";
import TextAreaField from "../fields/TextAreaField/TextAreaField";
import Button from "../../atoms/Buttons/Button/Button";
import StatusDropdownField from "../fields/StatusDropdownField/StatusDropdownField";
import SubtasksField from "../fields/SubtasksField/SubtaskField";
import type { Column, Task } from "../../../types/dataTypes";
import { useGetCurrentBoard } from "../../../hooks/queries/board/useGetCurrentBoard";
import { useEffect } from "react";
import { useCreateTask } from "../../../hooks/mutations/task/useCreateTask";
import { useUpdateTask } from "../../../hooks/mutations/task/useUpdateTask";

export default function TaskForm({
  type,
  task,
}: {
  type: "Add" | "Edit";
  task?: Task;
}) {
  const { data: boardData } = useGetCurrentBoard();

  const methods = useForm<Task>({
    defaultValues: {
      id: task?.id ?? "",
      title: task?.title ?? "",
      description: task?.description ?? "",
      subtasks: task?.subtasks ?? [
        { title: "", complete: false },
        { title: "", complete: false },
      ],
      columnId: task?.columnId ?? "Loading...",
    },
  });

  // Set the status value of the add form to the first column title of options
  useEffect(() => {
    if (!boardData?.columns?.length) return;
    if (type === "Edit") return;

    methods.setValue("columnId", boardData.columns[0].id);
  }, [boardData, type]);

  // Tanstack Query

  const { mutate: createTaskMutation, isPending: createTaskIsPending } =
    useCreateTask();
  const { mutate: updateTaskMutation, isPending: updateTaskIsPending } =
    useUpdateTask();

  // React hook forms

  // Functions
  const onSubmit = (data: Task) => {
    if (!boardData?.columns) return;

    const desiredColumn = boardData.columns.find(
      (column: Column) => column.id === data.columnId,
    );

    if (!data.columnId) {
      console.error("Column not found, must provide a column id");
      return;
    }

    if (type === "Add") {
      createTaskMutation({
        ...data,
        order: desiredColumn?.tasks?.length ?? 0,
      });
    }

    if (type === "Edit") {
      updateTaskMutation({
        ...data,
      });
    }
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
          name="columnId"
          label="Status"
          options={(boardData?.columns ?? []).map((column) => ({
            label: column.title,
            value: column.id,
          }))}
        />
        <Button
          type="submit"
          fullWidth={true}
          padBlock={0.8}
          style="primary"
          disabled={createTaskIsPending || updateTaskIsPending}
        >
          {createTaskIsPending || updateTaskIsPending
            ? "Saving..."
            : type === "Add"
              ? "Create Task"
              : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  );
}
