import { type ReactNode } from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  style = "primary",
  type = "button",
  size = "small",
  callback,
  padInline,
  padBlock,
  top,
  fullWidth,
  disabled,
}: {
  children: ReactNode;
  style: "primary" | "secondary" | "danger";
  type?: "submit" | "reset" | "button";
  size?: "large" | "small";
  callback?: () => void;
  padInline?: number;
  padBlock?: number | null;
  top?: number;
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={styles[style]}
      type={type}
      style={{
        paddingBlock: `${padBlock}rem`,
        width: fullWidth ? "100%" : undefined,
      }}
      onClick={callback}
      disabled={disabled}
    >
      <span
        style={{
          top: `${top ?? 0}rem`,
          paddingInline: `${padInline ?? 0}rem`,
          paddingBlock: `${(padBlock ?? size === "large") ? 1.4 : 8}rem`,
        }}
        className={`${size === "large" ? `headingM` : "bodyL"}`}
      >
        {children}
      </span>
    </button>
  );
}
