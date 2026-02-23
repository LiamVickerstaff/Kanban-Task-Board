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
import { useGetAllBoards } from "../../hooks/queries/board/useGetAllBoards";
import { useEffect } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";

export default function Sidebar() {
  const { isOpen, toggleSidebar, closeSideBar } = useSidebarStore();
  const { currentBoardId, setCurrentBoardId } = useUserStore();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const open = useModalStore((s) => s.open);
  const { user } = useUser();

  const {
    data: boardsData,
    isPending: isPendingBoards,
    isError: boardsHasError,
  } = useGetAllBoards();

  useEffect(() => {
    if (!boardsData) return;
    if (currentBoardId) return;

    console.log("boardsData inside sidebar after fetch:", boardsData);

    setCurrentBoardId(boardsData[0]?.id ?? "");
  }, [boardsData]);

  const handleAddNewBoard = () => {
    if (isMobile) {
      closeSideBar();
    }
    open(<BoardForm type="Add New" />);
  };

  const handleSelectBoard = (board: Board) => {
    setCurrentBoardId(board.id);
    if (isMobile) {
      closeSideBar();
    }
  };

  if (isPendingBoards) {
    return (
      <div
        className={styles.pageOverlay}
        onClick={() => isOpen && toggleSidebar()}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.boardsList}>
            <p>Loading...</p>
          </ul>
          <div className={styles.bottomGroup}>
            <LightDarkSwitch />
            {!isMobile && <HideSidebarButton />}
          </div>
        </div>
      </div>
    );
  }

  if (boardsHasError) {
    return (
      <div
        className={styles.pageOverlay}
        onClick={() => isOpen && toggleSidebar()}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <ul className={styles.boardsList}>
            <p>Failed to load boards. Please try to refresh your page.</p>
          </ul>
          <div className={styles.bottomGroup}>
            <LightDarkSwitch />
            {!isMobile && <HideSidebarButton />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.pageOverlay}
      onClick={() => isOpen && toggleSidebar()}
    >
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h3 className="headingS">ALL BOARDS ({boardsData?.length ?? "..."})</h3>
        <ul className={styles.boardsList}>
          {boardsData &&
            boardsData.length > 0 &&
            boardsData.map((board) => (
              <li key={board.id} className={`${styles.boardItem}`}>
                <button
                  className={`${styles.btn} headingM
                ${currentBoardId === board.id ? styles.active : styles.inactive}
                `}
                  onClick={() => {
                    handleSelectBoard(board);
                  }}
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
          <div className={`${styles.userGroup} ${styles.btn} headingM`}>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: {
                    width: "30px",
                    height: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                    flexShrink: 0,
                  },
                },
              }}
            />
            <p>{user?.fullName}</p>
          </div>
          <LightDarkSwitch />
          {!isMobile && <HideSidebarButton />}
        </div>
      </div>
    </div>
  );
}
