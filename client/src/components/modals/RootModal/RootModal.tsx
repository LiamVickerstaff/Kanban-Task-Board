import { useEffect } from "react";
import styles from "./RootModal.module.css";
import { createPortal } from "react-dom";
import useModalStore from "../../../stores/useModalStore";
import { easeIn, easeInOut, easeOut, motion } from "motion/react";

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
      <motion.div
        initial={{ opacity: 0, y: "-2rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalScrollArea}>{content}</div>
      </motion.div>
    </div>,
    document.body,
  );
}
