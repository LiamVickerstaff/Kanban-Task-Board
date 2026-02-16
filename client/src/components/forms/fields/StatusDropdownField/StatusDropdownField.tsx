import { useFormContext } from "react-hook-form";
import styles from "./StatusDropdownField.module.css";
import { useRef, useState } from "react";
import DownTick from "../../../icons/DownTick";
import { createPortal } from "react-dom";

export default function StatusDropdownField({
  name,
  label,
  options,
  onStatusChange,
}: {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  onStatusChange?: (newColumnId: string) => void;
}) {
  const { setValue, watch } = useFormContext();
  const currentValue = watch(name);

  const selectedOption = options.find(
    (option) => option.value === currentValue,
  )?.label;

  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggleDropdown = () => {
    const btnElement = buttonRef.current?.getBoundingClientRect();
    if (btnElement) setRect(btnElement);
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (option: string) => {
    setValue(name, option);

    if (onStatusChange) {
      onStatusChange(option);
    }

    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <label className="headingS formFieldLabel">{label}</label>
      <div className="formFieldGroup">
        <button
          ref={buttonRef}
          type="button"
          data-open={isOpen}
          className={`${styles.openOptionsBtn} formFieldInput`}
          onClick={toggleDropdown}
        >
          <span className={`${styles.currentStatus} bodyL`}>
            {selectedOption ?? "Select status"}
          </span>
          <span>
            <DownTick className={styles.downTick} />
          </span>
        </button>
      </div>
      {isOpen &&
        rect &&
        createPortal(
          <ul
            className={styles.optionsMenu}
            style={{
              position: "absolute",
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              zIndex: 1000,
            }}
          >
            {options.map((option) => (
              <li key={option.value} className={styles.optionItem}>
                <button
                  className={`bodyL ${styles.optionBtn}`}
                  type="button"
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
