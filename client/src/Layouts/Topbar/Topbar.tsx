import styles from "./Topbar.module.css";
import DownTick from "../../components/icons/DownTick";
import Button from "../../components/atoms/Buttons/Button/Button";
import useModalStore from "../../stores/useModalStore";
import AddTaskForm from "../../components/forms/AddTaskForm/AddTaskForm";
import KebabButton from "../../components/atoms/Buttons/KebabButton/KebabButton";
import useSidebarStore from "../../stores/useSidebarStore";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function Topbar() {
  const open = useModalStore((s) => s.open);
  const { currentBoard, toggleSidebar } = useSidebarStore();
  const isMobile = useMediaQuery("(min-width: 768px)");

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
        <DownTick className={styles.downTick} />
      </button>
      <div className={styles.groupPlusKebab}>
        <Button
          top={-0.2}
          padInline={1.2}
          padBlock={isMobile ? 1.4 : 0.8}
          style="primary"
          size="large"
          callback={() => open(<AddTaskForm />)}
        >
          + {isMobile && "Add New Task"}
        </Button>
        <KebabButton type="Board" />
      </div>
    </div>
  );
}
