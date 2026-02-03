import styles from "./Topbar.module.css";
import DownTick from "../../components/icons/DownTick";
import Button from "../../components/atoms/Buttons/Button/Button";
import useModalStore from "../../stores/useModalStore";
import AddTaskForm from "../../components/forms/AddTaskForm/AddTaskForm";
import KebabButton from "../../components/atoms/Buttons/KebabButton/KebabButton";
import useSidebarStore from "../../stores/useSidebarStore";
import useMediaQuery from "../../hooks/useMediaQuery";
import PlusIcon from "../../components/icons/PlusIcon";

export default function Topbar() {
  const open = useModalStore((s) => s.open);
  const { currentBoard, toggleSidebar } = useSidebarStore();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.selectBoardBtn}`}
        onClick={handleClick}
      >
        <h2 className={`headingXL ${styles.currentBoardTitle}`}>
          {currentBoard}
        </h2>
        {isMobile && <DownTick className={styles.downTick} />}
      </button>
      <div className={styles.groupPlusKebab}>
        <button
          className={`${styles.addNewTaskBtn} headingM`}
          onClick={() => open(<AddTaskForm />)}
        >
          {isMobile ? <PlusIcon /> : "+ Add New Task"}
        </button>
        <KebabButton type="Board" />
      </div>
    </div>
  );
}
