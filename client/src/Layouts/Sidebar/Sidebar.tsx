import styles from "./Sidebar.module.css";
import LightDarkSwitch from "../../components/LightDarkSwitch/LightDarkSwitch";
import useSidebarStore from "../../stores/useSidebarStore";
import BoardIcon from "../../components/icons/BoardIcon";
import BoardForm from "../../components/forms/BoardForm/BoardForm";
import useModalStore from "../../stores/useModalStore";
import useMediaQuery from "../../hooks/useMediaQuery";
import HideSidebarButton from "../../components/HideSidebarButton/HideSidebarButton";
import type { Board } from "../../types/dataTypes";
import { useUserStore } from "../../stores/useUserStore";

export default function Sidebar() {
  const { isOpen, toggleSidebar, closeSideBar } = useSidebarStore();
  const { boards, currentBoard, setCurrentBoard } = useUserStore();

  const isMobile = useMediaQuery("(max-width: 767px)");

  const open = useModalStore((s) => s.open);

  const handleAddNewBoard = () => {
    if (isMobile) {
      closeSideBar();
    }
    open(<BoardForm type="Add New" />);
  };

  const handleSelectBoard = (board: Board) => {
    setCurrentBoard(board);
    if (isMobile) {
      closeSideBar();
    }
  };

  return (
    <div
      className={styles.pageOverlay}
      onClick={() => isOpen && toggleSidebar()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h3 className="headingS">ALL BOARDS ({sampleBoardData.length})</h3>
        <ul className={styles.boardsList}>
          {boards && boards.length > 0 ? (
            boards.map((board) => (
              <li key={board.id} className={`${styles.boardItem}`}>
                <button
                  className={`${styles.btn} headingM
                ${currentBoard.title === board.title ? styles.active : styles.inactive}
                `}
                  onClick={() => {
                    handleSelectBoard(board);
                  }}
                >
                  <BoardIcon />
                  <p>{board.title}</p>
                </button>
              </li>
            ))
          ) : (
            <p>No boards</p>
          )}
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

const sampleBoardData = [
  {
    id: "ebfi1303n",
    title: "Platform Launch",
    columns: [{ title: "Todo" }, { title: "Doing" }, { title: "Done" }],
  },
  {
    id: "943nq94",
    title: "Marketing Plan",
    columns: [{ title: "Todo" }, { title: "Doing" }, { title: "Done" }],
  },
  {
    id: "lapei2p1",
    title: "Roadmap",
    columns: [{ title: "Todo" }, { title: "Doing" }, { title: "Done" }],
  },
];
