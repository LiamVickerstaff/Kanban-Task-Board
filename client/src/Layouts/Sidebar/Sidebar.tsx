import styles from "./Sidebar.module.css";
import LightDarkSwitch from "../../components/LightDarkSwitch/LightDarkSwitch";
import useSidebarStore from "../../stores/useSidebarStore";
import BoardIcon from "../../components/icons/BoardIcon";
import BoardForm from "../../components/forms/BoardForm/BoardForm";
import useModalStore from "../../stores/useModalStore";
import useMediaQuery from "../../hooks/useMediaQuery";
import HideSidebarButton from "../../components/HideSidebarButton/HideSidebarButton";

export default function Sidebar() {
  const { isOpen, currentBoard, toggleSidebar, setCurrentBoard } =
    useSidebarStore();

  const isMobile = useMediaQuery("(max-width: 767px)");

  const open = useModalStore((s) => s.open);

  const sampleBoardData = [
    { title: "Platform Launch" },
    { title: "Marketing Plan" },
    { title: "Roadmap" },
  ];

  const handleAddNewBoard = () => {
    if (isOpen) toggleSidebar();
    open(<BoardForm type="Add New" />);
  };

  return (
    <div
      className={styles.pageOverlay}
      onClick={() => isOpen && toggleSidebar()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h3 className="headingS">ALL BOARDS ({sampleBoardData.length})</h3>
        <ul className={styles.boardsList}>
          {sampleBoardData.map((board, index) => (
            <li key={index} className={`${styles.boardItem}`}>
              <button
                className={`${styles.btn} headingM
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
            <button
              className={`${styles.btn} headingM`}
              onClick={() => handleAddNewBoard()}
            >
              + Create New Board
            </button>
          </li>
        </ul>
        <div className={styles.bottomGroup}>
          <LightDarkSwitch />
          {!isMobile && <HideSidebarButton />}
        </div>
      </div>
    </div>
  );
}
