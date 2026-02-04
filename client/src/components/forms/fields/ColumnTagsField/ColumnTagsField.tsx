import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./ColumnTagsField.module.css";
import Button from "../../../atoms/Buttons/Button/Button.js";
import XButton from "../../../atoms/Buttons/XButton/XButton.js";
import type { BoardType } from "../../../../types/boardTypes.js";

export default function ColumnsTagsField() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BoardType>();

  const { fields, append, remove } = useFieldArray<BoardType, "columns", "id">({
    control,
    name: "columns",
  });

  return (
    <div className="formFieldContainer">
      <label className="headingS formFieldLabel" id="columns-label">
        Board Columns
      </label>
      <ul className={styles.listGroup} aria-labelledby="columns-label">
        {fields.map((field, index) => {
          const error = errors.columns?.[index]?.title;
          const errorId = error ? `column-${index}-error` : undefined;

          return (
            <li className={styles.tagItem} key={field.id}>
              <div
                className={`formFieldGroup ${error ? "formFieldHasError" : ""}`}
              >
                <input
                  className="bodyL formFieldInput"
                  type="text"
                  placeholder={placeholderText[index]}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={errorId}
                  {...register(`columns.${index}.title` as const, {
                    required: "Can't be empty",
                    minLength: { value: 2, message: "Min length: 2" },
                    maxLength: { value: 50, message: "Max length: 50" },
                  })}
                  defaultValue={field.title}
                />
                {error && typeof error.message === "string" && (
                  <p id={errorId} className="formErrorMessage bodyL">
                    {error.message}
                  </p>
                )}
              </div>
              <XButton callback={() => remove(index)} />
            </li>
          );
        })}
      </ul>
      <Button
        padBlock={0.8}
        style="secondary"
        callback={() => append({ title: "" })}
      >
        + Add New Column
      </Button>
    </div>
  );
}

const placeholderText = ["Todo", "Doing", "Done"];
