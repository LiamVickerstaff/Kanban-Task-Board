import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./SubtasksField.module.css";
import { placeholderText } from "../../../../sampleTaskData.js";
import type { TaskType } from "../../../../types/taskTypes.js";
import Button from "../../../atoms/Buttons/Button/Button.js";
import XButton from "../../../atoms/Buttons/XButton/XButton.js";

export default function SubtasksField() {
  const { register, control } = useFormContext<TaskType>();

  const { fields, append, remove } = useFieldArray<TaskType, "subtasks", "id">({
    control,
    name: "subtasks",
  });

  return (
    <div className="formFieldContainer">
      <label className="formFieldLabel" htmlFor="subtasks">
        Subtasks
      </label>
      <ul className={styles.listGroup} id={"subtasks"}>
        {fields.map((field, index) => (
          <li className={styles.subtaskItem} key={field.id}>
            <input
              className="formFieldInput"
              type="text"
              placeholder={placeholderText.subtasks[0] || ""}
              {...register(`subtasks.${index}.title` as const, {
                required: "Required",
              })}
              defaultValue={field.title}
            />
            <XButton callback={() => remove(index)} />
          </li>
        ))}
      </ul>
      <Button
        fontSize={1.3}
        padBlock={0.8}
        style="secondary"
        callback={() => append({ title: "", complete: false })}
      >
        + Add New Subtask
      </Button>
    </div>
  );
}
