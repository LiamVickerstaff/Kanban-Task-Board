import { useFormContext } from "react-hook-form";
import styles from "./StatusDropdownField.module.css";
import { useRef, useState } from "react";
import DownTick from "../../../icons/DownTick";
import { createPortal } from "react-dom";

export default function StatusDropdownField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  const { setValue, watch } = useFormContext();
  const currentStatus = watch(name);

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
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <label className="formFieldLabel">{label}</label>
      <button
        ref={buttonRef}
        type="button"
        data-open={isOpen}
        className={`${styles.openOptionsBtn} formFieldInput`}
        onClick={toggleDropdown}
      >
        <span className={styles.currentStatus}>{currentStatus}</span>
        <span>
          <DownTick className={styles.downTick} />
        </span>
      </button>
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
              <li key={option} className={styles.optionItem}>
                <button
                  className={styles.optionBtn}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
