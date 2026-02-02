import { FormProvider, useForm } from "react-hook-form";
import styles from "./BoardForm.module.css";
import TextField from "../fields/TextField/TextField.js";
import Button from "../../atoms/Buttons/Button/Button.js";
import type { BoardType } from "../../../types/boardTypes.js";
import ColumnsTagsField from "../fields/ColumnTagsField/ColumnTagsField.js";
import { boardData } from "../../../sampleTaskData.js";

export default function BoardForm({ type }: { type: "Add New" | "Edit" }) {
  const emptyBoardValues = {
    title: "",
    columns: [{ title: "" }, { title: "" }, { title: "" }],
  };

  const defaultFormValues = type === "Add New" ? emptyBoardValues : boardData;

  const methods = useForm<BoardType>({
    defaultValues: defaultFormValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="formContainer" onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>{type} Board</h2>
        <TextField name="title" label="Board Name" />
        <ColumnsTagsField />
        <Button
          type="submit"
          fontSize={1.3}
          fullWidth={true}
          padBlock={0.8}
          style="primary"
        >
          Create Task
        </Button>
      </form>
    </FormProvider>
  );
}
