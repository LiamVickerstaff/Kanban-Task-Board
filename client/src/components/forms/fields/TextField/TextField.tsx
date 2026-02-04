import { useFormContext } from "react-hook-form";

export default function TextField({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
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
        <input
          id={name}
          type="text"
          className={`bodyL formFieldInput `}
          placeholder="e.g. Take coffee break"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...register(name, {
            required: "Can't be empty",
            minLength: { value: 2, message: "Min length: 2" },
            maxLength: {
              value: 100,
              message: "Max 100 characters",
            },
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
