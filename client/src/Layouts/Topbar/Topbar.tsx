import styles from "./Topbar.module.css";
import DownTick from "../../components/icons/DownTick";
import useModalStore from "../../stores/useModalStore";
import KebabButton from "../../components/atoms/Buttons/KebabButton/KebabButton";
import useSidebarStore from "../../stores/useSidebarStore";
import useMediaQuery from "../../hooks/useMediaQuery";
import PlusIcon from "../../components/icons/PlusIcon";
import TaskForm from "../../components/forms/TaskForm/TaskForm";
import { useUserStore } from "../../stores/useUserStore";

export default function Topbar() {
  const open = useModalStore((s) => s.open);
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
  const currentBoard = useUserStore((s) => s.currentBoard);
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.selectBoardBtn}`}
        onClick={() => toggleSidebar()}
        disabled={!isMobile}
      >
        <h2 className={`headingXL ${styles.currentBoardTitle}`}>
          {currentBoard.title}
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
        <KebabButton type="Board" item={currentBoard} />
      </div>
    </div>
  );
}
