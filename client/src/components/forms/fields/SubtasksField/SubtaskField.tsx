import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./SubtasksField.module.css";
import Button from "../../../atoms/Buttons/Button/Button.js";
import XButton from "../../../atoms/Buttons/XButton/XButton.js";
import type { Task } from "../../../../types/dataTypes.js";

export default function SubtasksField() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Task>();

  const { fields, append, remove } = useFieldArray<Task, "subtasks", "id">({
    control,
    name: "subtasks",
  });

  return (
    <div className="formFieldContainer">
      <label className="headingS formFieldLabel" id="subtasks-label">
        Subtasks
      </label>
      <ul className={styles.listGroup} aria-labelledby="subtasks-label">
        {fields.map((field, index) => {
          const error = errors.subtasks?.[index]?.title;
          const errorId = error ? `subtask-${index}-error` : undefined;

          return (
            <li className={styles.subtaskItem} key={field.id}>
              <div
                className={`formFieldGroup ${error ? "formFieldHasError" : ""}`}
              >
                <input
                  type="text"
                  className="bodyL formFieldInput"
                  placeholder={placeholderText[0]}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={errorId}
                  {...register(`subtasks.${index}.title` as const, {
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
        callback={() => append({ title: "", complete: false })}
      >
        + Add New Subtask
      </Button>
    </div>
  );
}

const placeholderText = ["e.g. Make Coffee", "e.g. Drink coffee and smile"];
