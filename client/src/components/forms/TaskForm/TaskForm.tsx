import { FormProvider, useForm } from "react-hook-form";
// import styles from "./TaskForm.module.css";
import TextField from "../fields/TextField/TextField";
import TextAreaField from "../fields/TextAreaField/TextAreaField";
import Button from "../../atoms/Buttons/Button/Button";
import StatusDropdownField from "../fields/StatusDropdownField/StatusDropdownField";
import SubtasksField from "../fields/SubtasksField/SubtaskField";
import useModalStore from "../../../stores/useModalStore";
import type { ColumnType, TaskType } from "../../../types/dataTypes";
import { useUserStore } from "../../../stores/useUserStore";
import { useGetCurrentBoard } from "../../../hooks/queries/board/useGetCurrentBoard";

export default function TaskForm({
  type,
  task,
}: {
  type: "Add" | "Edit";
  task?: TaskType;
}) {
  // Zustand store state
  const close = useModalStore((s) => s.close);
  const currentBoard = useUserStore((s) => s.currentBoard);

  const {} = useGetCurrentBoard(currentBoard.id);

  // Tanstack Query
  // const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: type === "Add" ? createTask : updateTask,
  //   onSuccess: (res) => {
  //     queryClient.invalidateQueries({ queryKey: ["tasks"] });
  //     alert(res.message);
  //     close();
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     alert(`Something went wrong. Please try again.`);
  //   },
  // });
  // const { mutate, isPending } = mutation;

  // React hook forms
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

  // Functions
  const onSubmit = (data: TaskType) => {
    let newTask;

    if (type === "Add") {
      const desiredColumn = currentBoard.columns.find(
        (column: ColumnType) => column.title === data.status,
      );
      // console.log("desiredColumn's id:", desiredColumn.id)
      const nextOrderNumber = desiredColumn.tasks.length;
      const columnId = desiredColumn.id;

      newTask = { ...data, order: nextOrderNumber, columnId };

      console.log("add task form data: ", newTask);
      // mutate({ newTask });
    }

    if (type === "Edit") {
      newTask = { ...data };
      console.log("edit task form data: ", newTask);
      // mutate({ newTask });
    }

    console.log(`Submitting ${type} form: `, newTask);
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
        <Button
          type="submit"
          fullWidth={true}
          padBlock={0.8}
          style="primary"
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : type === "Add"
              ? "Create Task"
              : "Save Changes"}
        </Button>
      </form>
    </FormProvider>
  );
}
