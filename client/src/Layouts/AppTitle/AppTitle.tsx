import styles from "./AppTitle.module.css";
import KanbanLogo from "../../components/icons/KanbanLogo";
import KanbanTitle from "../../components/icons/KanbanTitle";
import useSidebarStore from "../../stores/useSidebarStore";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function AppTitle() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isOpen = useSidebarStore((s) => s.isOpen);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
    >
      <KanbanLogo />
      {!isMobile && <KanbanTitle className={styles.kanbanTitle} />}
    </div>
  );
}
