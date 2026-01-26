import { useState } from "react";
import styles from "./Topbar.module.css";
import DownTick from "../../components/icons/DownTick";
import KebabIcon from "../../components/icons/KebabIcon";
import PrimaryBtn from "../../components/atoms/PrimaryBtn/PrimaryBtn";

export default function Topbar() {
  const [currentBoard, setCurrentBoard] = useState("Platform Launch");

  return (
    <div className={styles.container}>
      <button className={`${styles.btn} ${styles.selectBoardBtn}`}>
        <h2 className={styles.currentBoardTitle}>{currentBoard}</h2>
        <DownTick className={styles.downTick} />
      </button>
      <div className={styles.groupPlusKebab}>
        <PrimaryBtn top={-2} padInline={12} fontSize={2}>
          +
        </PrimaryBtn>
        <button className={`${styles.btn}`}>
          <KebabIcon />
        </button>
      </div>
    </div>
  );
}
