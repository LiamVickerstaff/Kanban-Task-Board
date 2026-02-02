import { useState } from "react";
import styles from "./BoardsMenu.module.css";
import LightDarkSwitch from "../LightDarkSwitch/LightDarkSwitch";

export default function BoardsMenu() {
  const sampleBoardData = [
    { title: "Platform Launch" },
    { title: "Marketing Plan" },
    { title: "Roadmap" },
  ];
  const [activeBoard, setActiveBoard] = useState(sampleBoardData[0].title);

  return (
    <div className={styles.container}>
      <h3>ALL BOARDS ({sampleBoardData.length})</h3>
      <ul className={styles.boardsList}>
        {sampleBoardData.map((board, index) => (
          <li key={index} className={`${styles.boardItem}`}>
            <button
              className={`${styles.btn} 
                ${activeBoard === board.title ? styles.active : styles.inactive}
                `}
              onClick={() => setActiveBoard(board.title)}
            >
              {board.title}
            </button>
          </li>
        ))}
        <li className={styles.newBoardItem}>
          <button className={`${styles.btn}`}>+ Create New Board</button>
        </li>
      </ul>
      <LightDarkSwitch />
    </div>
  );
}
