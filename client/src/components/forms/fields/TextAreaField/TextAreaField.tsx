import { useFormContext } from "react-hook-form";
import styles from "./TextAreaField.module.css";
import { placeholderText } from "../../../../sampleTaskData.js";

type Props = {
  name: string;
  label: string;
};

export default function TextAreaField({ name, label }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`formFieldContainer`}>
      <label className={`headingS formFieldLabel`} htmlFor={name}>
        {label}
      </label>

      <textarea
        className={`bodyL formFieldInput ${styles.description}`}
        id={name}
        placeholder={placeholderText.description || ""}
        {...register(name)}
        rows={4}
      />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}
