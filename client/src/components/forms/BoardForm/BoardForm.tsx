import { FormProvider, useForm } from "react-hook-form";
// import styles from "./BoardForm.module.css";
import TextField from "../fields/TextField/TextField.js";
import Button from "../../atoms/Buttons/Button/Button.js";
import ColumnsTagsField from "../fields/ColumnTagsField/ColumnTagsField.js";
import { useUserStore } from "../../../stores/useUserStore.js";
import type { BoardFormData } from "../../../types/formTypes.js";
import { useCreateBoard } from "../../../hooks/mutations/board/useCreateBoard.js";
import { useUpdateBoard } from "../../../hooks/mutations/board/useUpdateBoard.js";
import { useGetCurrentBoard } from "../../../hooks/queries/board/useGetCurrentBoard.js";
import { useEffect } from "react";

export default function BoardForm({ type }: { type: "Add New" | "Edit" }) {
  // useModalStore state
  const { id: userId } = useUserStore();

  const { data: board } = useGetCurrentBoard();

  // Tanstack mutation
  const { mutate: createBoardMutation, isPending: createBoardIsPending } =
    useCreateBoard();
  const { mutate: updateBoardMutation, isPending: updateBoardIsPending } =
    useUpdateBoard();

  // React hook forms
  const methods = useForm<BoardFormData>({
    defaultValues: emptyBoardValues,
  });

  useEffect(() => {
    if (type === "Edit" && board) {
      methods.reset(board);
    }
  }, [type, board, methods.reset]);

  // Functions
  const onSubmit = (data: BoardFormData) => {
    const normalizedColumns = data.columns.map((col, index) => ({
      ...col,
      order: index,
    }));
    if (type === "Add New") {
      createBoardMutation({ ...data, columns: normalizedColumns, userId });
    } else {
      updateBoardMutation({ ...data, columns: normalizedColumns });
    }
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
          disabled={createBoardIsPending || updateBoardIsPending}
        >
          {createBoardIsPending || updateBoardIsPending
            ? "Saving..."
            : `${type} Board`}
        </Button>
      </form>
    </FormProvider>
  );
}

const emptyBoardValues = {
  title: "",
  columns: [{ title: "" }, { title: "" }, { title: "" }],
};
