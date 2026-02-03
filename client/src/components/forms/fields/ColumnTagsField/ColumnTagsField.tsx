import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./ColumnTagsField.module.css";
import { placeholderText } from "../../../../sampleTaskData.js";
import Button from "../../../atoms/Buttons/Button/Button.js";
import XButton from "../../../atoms/Buttons/XButton/XButton.js";
import type { BoardType } from "../../../../types/boardTypes.js";
import TextField from "../TextField/TextField.js";

export default function ColumnsTagsField() {
  const { register, control } = useFormContext<BoardType>();

  const { fields, append, remove } = useFieldArray<BoardType, "columns", "id">({
    control,
    name: "columns",
  });

  return (
    <div className="formFieldContainer">
      <label className="headingS formFieldLabel" htmlFor="columns">
        Board Columns
      </label>
      <ul className={styles.listGroup} id={"columns"}>
        {fields.map((field, index) => (
          <li className={styles.tagItem} key={field.id}>
            <input
              className="bodyL formFieldInput"
              type="text"
              placeholder="New Column Name"
              {...register(`columns.${index}.title` as const, {
                required: "Required",
              })}
              defaultValue={field.title}
            />
            <XButton callback={() => remove(index)} />
          </li>
        ))}
      </ul>
      <Button
        padBlock={0.8}
        style="secondary"
        callback={() => append({ title: "" })}
      >
        + Add New Subtask
      </Button>
    </div>
  );
}
