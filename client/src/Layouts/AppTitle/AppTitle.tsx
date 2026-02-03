import styles from "./AppTitle.module.css";
import KanbanLogo from "../../components/icons/KanbanLogo";
import useMediaQuery from "../../hooks/useMediaQuery";
import KanbanTitle from "../../components/icons/KanbanTitle";
import useSidebarStore from "../../stores/useSidebarStore";

export default function AppTitle() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isOpen = useSidebarStore((s) => s.isOpen);

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.copySidebarWidth : styles.regularWidth}`}
    >
      <KanbanLogo />
      {!isMobile && <KanbanTitle className={styles.kanbanTitle} />}
    </div>
  );
}
