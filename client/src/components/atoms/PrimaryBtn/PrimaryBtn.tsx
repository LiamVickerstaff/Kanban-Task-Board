import { type ReactNode } from "react";
import styles from "./PrimaryBtn.module.css";

export default function PrimaryBtn({
  children,
  padInline,
  padBlock,
  top,
  fontSize,
}: {
  children: ReactNode;
  padInline?: number;
  padBlock?: number;
  top?: number;
  fontSize?: number;
}) {
  return (
    <button
      className={styles.plusBtn}
      style={{ paddingBlock: `${padBlock}px` }}
    >
      <span
        style={{
          top: `${top ?? 0}px`,
          paddingInline: `${padInline ?? 0}px`,
          fontSize: `${fontSize ?? 0}rem`,
        }}
      >
        {children}
      </span>
    </button>
  );
}
