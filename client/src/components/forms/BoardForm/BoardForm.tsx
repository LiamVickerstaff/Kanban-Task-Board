import { FormProvider, useForm } from "react-hook-form";
// import styles from "./BoardForm.module.css";
import TextField from "../fields/TextField/TextField.js";
import Button from "../../atoms/Buttons/Button/Button.js";
import ColumnsTagsField from "../fields/ColumnTagsField/ColumnTagsField.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useModalStore from "../../../stores/useModalStore.js";
import { createBoard, updateBoard } from "../../../api/domains/boardsApi.js";
import type { Board } from "../../../types/dataTypes.js";
import { useUserStore } from "../../../stores/useUserStore.js";
import type { BoardFormData } from "../../../types/formTypes.js";

export default function BoardForm({
  type,
  board,
}: {
  type: "Add New" | "Edit";
  board?: Board;
}) {
  // useModalStore state
  const close = useModalStore((s) => s.close);
  const userId = useUserStore((s) => s.id);

  // Tanstack mutation
  const queryClient = useQueryClient();
  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      close();
    },
    onError: () => {
      alert("Failed to save board changes");
    },
  });

  // React hook forms
  const defaultFormValues = type === "Add New" ? emptyBoardValues : board;
  const methods = useForm<BoardFormData>({
    defaultValues: defaultFormValues,
  });

  // Functions
  const onSubmit = (data: BoardFormData) => {
    if (type === "Add New") {
      createBoardMutation.mutate({ ...data, userId });
    } else {
      console.log("edit form submit");
    }
    console.log(`Submitting ${type} form: `, data);
  };

  return (
    <FormProvider {...methods}>
      <form className="formContainer" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="headingL">{type} Board</h2>
        <TextField name="title" label="Board Name" />
        <ColumnsTagsField />
        <Button
          type="submit"
          fullWidth={true}
          padBlock={0.8}
          style="primary"
          disabled={createBoardMutation.isPending}
        >
          {createBoardMutation.isPending ? "Saving..." : `${type} Board`}
        </Button>
      </form>
    </FormProvider>
  );
}

const emptyBoardValues = {
  title: "",
  columns: [
    { order: 0, title: "" },
    { order: 1, title: "" },
    { order: 2, title: "" },
  ],
};
