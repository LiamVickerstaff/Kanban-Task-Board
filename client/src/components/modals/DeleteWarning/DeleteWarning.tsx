import useModalStore from "../../../stores/useModalStore";
import Button from "../../atoms/Buttons/Button/Button";
import styles from "./DeleteWarning.module.css";

export default function DeleteWarning({
  type,
  title,
}: {
  type: "board" | "task";
  title: string;
}) {
  const close = useModalStore((s) => s.close);

  return (
    <div className={styles.container}>
      <h2>Delete this {type}?</h2>
      <p>
        Are you sure you want to delete the <b>'{title}'</b> {type}? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={styles.btnGroup}>
        <Button
          type="button"
          style="danger"
          fullWidth={true}
          fontSize={1.3}
          padBlock={0.8}
        >
          Delete
        </Button>
        <Button
          type="button"
          style="secondary"
          fullWidth={true}
          fontSize={1.3}
          padBlock={0.8}
          callback={close}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
