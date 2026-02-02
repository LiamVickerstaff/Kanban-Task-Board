import { useFormContext } from "react-hook-form";
import { placeholderText } from "../../../../sampleTaskData.js";

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

  return (
    <div className={`formFieldContainer`}>
      <label className={`formFieldLabel`} htmlFor={name}>
        {label}
      </label>
      <input
        className={`formFieldInput`}
        type="text"
        placeholder={placeholderText.title || ""}
        id={name}
        {...register(name, { required: "Required" })}
      />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}
