import styles from "./Sidebar.module.css";
import LightDarkSwitch from "../../components/LightDarkSwitch/LightDarkSwitch";
import useSidebarStore from "../../stores/useSidebarStore";
import BoardIcon from "../../components/icons/BoardIcon";

export default function Sidebar() {
  const { isOpen, currentBoard, toggleSidebar, setCurrentBoard } =
    useSidebarStore();

  const sampleBoardData = [
    { title: "Platform Launch" },
    { title: "Marketing Plan" },
    { title: "Roadmap" },
  ];

  return (
    <div
      className={styles.pageOverlay}
      onClick={() => isOpen && toggleSidebar()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h3>ALL BOARDS ({sampleBoardData.length})</h3>
        <ul className={styles.boardsList}>
          {sampleBoardData.map((board, index) => (
            <li key={index} className={`${styles.boardItem}`}>
              <button
                className={`${styles.btn} 
                ${currentBoard === board.title ? styles.active : styles.inactive}
                `}
                onClick={() => setCurrentBoard(board.title)}
              >
                <BoardIcon />
                <p>{board.title}</p>
              </button>
            </li>
          ))}
          <li className={styles.newBoardItem}>
            <button className={`${styles.btn}`}>+ Create New Board</button>
          </li>
        </ul>
        <LightDarkSwitch />
      </div>
    </div>
  );
}
