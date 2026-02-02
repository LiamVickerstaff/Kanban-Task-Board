import styles from "./XButton.module.css";
import DeleteX from "../../../icons/DeleteX";

export default function XButton({ callback }: { callback: () => void }) {
  return (
    <button className={styles.btn} type="button" onClick={callback}>
      <DeleteX width={15} height={15} />
    </button>
  );
}
