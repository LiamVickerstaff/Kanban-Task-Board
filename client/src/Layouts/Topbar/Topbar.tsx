import styles from "./Topbar.module.css";
import DownTick from "../../components/icons/DownTick";
import useModalStore from "../../stores/useModalStore";
import KebabButton from "../../components/atoms/Buttons/KebabButton/KebabButton";
import useSidebarStore from "../../stores/useSidebarStore";
import useMediaQuery from "../../hooks/useMediaQuery";
import PlusIcon from "../../components/icons/PlusIcon";
import TaskForm from "../../components/forms/TaskForm/TaskForm";
import { useGetCurrentBoard } from "../../hooks/queries/board/useGetCurrentBoard";
import { useEffect } from "react";

export default function Topbar() {
  const open = useModalStore((s) => s.open);
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { data: boardData, isPending } = useGetCurrentBoard();

  useEffect(() => {
    console.log("boardData inside TopBar component:", boardData);
  }, [boardData]);

  if (isPending) {
    return (
      <div className={styles.container}>
        <button
          className={`${styles.btn} ${styles.selectBoardBtn}`}
          onClick={() => toggleSidebar()}
          disabled={!isMobile}
        >
          <h2 className={`headingXL ${styles.currentBoardTitle}`}>
            Loading Board...
          </h2>
          {isMobile && <DownTick className={styles.downTick} />}
        </button>
      </div>
    );
  }

  if (!boardData)
    return (
      <div className={styles.container}>
        <button
          className={`${styles.btn} ${styles.selectBoardBtn}`}
          onClick={() => toggleSidebar()}
          disabled={!isMobile}
        >
          <h2 className={`headingXL ${styles.currentBoardTitle}`}>
            No Board Selected
          </h2>
          {isMobile && <DownTick className={styles.downTick} />}
        </button>
        <div className={styles.groupPlusKebab}>
          <button
            className={`${styles.addNewTaskBtn} headingM`}
            onClick={() => open(<TaskForm type="Add" />)}
            disabled={true}
          >
            {isMobile ? <PlusIcon /> : "+ Add New Task"}
          </button>
          <KebabButton
            type="Board"
            item={{ id: "", title: "" }}
            disabled={true}
          />
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.selectBoardBtn}`}
        onClick={() => toggleSidebar()}
        disabled={!isMobile}
      >
        <h2 className={`headingXL ${styles.currentBoardTitle}`}>
          {isPending ? "Loading..." : boardData.title}
        </h2>
        {isMobile && <DownTick className={styles.downTick} />}
      </button>
      <div className={styles.groupPlusKebab}>
        <button
          className={`${styles.addNewTaskBtn} headingM`}
          onClick={() => open(<TaskForm type="Add" />)}
        >
          {isMobile ? <PlusIcon /> : "+ Add New Task"}
        </button>
        <KebabButton type="Board" item={boardData} />
      </div>
    </div>
  );
}
