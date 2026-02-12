import { useFormContext } from "react-hook-form";
import styles from "./TextAreaField.module.css";

type Props = {
  name: string;
  label: string;
};

export default function TextAreaField({ name, label }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorId = `${name}-error`;

  return (
    <div className={`formFieldContainer`}>
      <label className={`headingS formFieldLabel`} htmlFor={name}>
        {label}
      </label>

      <div className={`formFieldGroup ${error ? "formFieldHasError" : ""}`}>
        <textarea
          id={name}
          rows={4}
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          className={`bodyL formFieldInput ${styles.description}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...register(name, {
            minLength: { value: 2, message: "Min length: 2" },
            maxLength: { value: 500, message: "Max length: 500" },
          })}
        />
        {error && typeof error.message === "string" && (
          <p id={errorId} className="formErrorMessage bodyL">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
