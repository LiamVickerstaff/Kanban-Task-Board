import { type ReactNode } from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  style = "primary",
  type = "button",
  callback,
  padInline,
  padBlock,
  top,
  fontSize,
  fullWidth,
}: {
  children: ReactNode;
  style: "primary" | "secondary" | "danger";
  type?: "submit" | "reset" | "button";
  callback?: () => void;
  padInline?: number;
  padBlock?: number;
  top?: number;
  fontSize?: number;
  fullWidth?: boolean;
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
    >
      <span
        style={{
          top: `${top ?? 0}rem`,
          paddingInline: `${padInline ?? 0}rem`,
          fontSize: `${fontSize ?? 0}rem`,
        }}
      >
        {children}
      </span>
    </button>
  );
}
