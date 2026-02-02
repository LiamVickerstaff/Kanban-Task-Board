import { useEffect } from "react";
import styles from "./RootModal.module.css";
import { createPortal } from "react-dom";
import useModalStore from "../../../stores/useModalStore";

export default function RootModal() {
  const { isOpen, content, close } = useModalStore();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!content || !isOpen) return;

  return createPortal(
    <div className={styles.pageOverlay} onClick={close}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalScrollArea}>{content}</div>
      </div>
    </div>,
    document.body,
  );
}
