import styles from "./AppTitle.module.css";
import KanbanLogo from "../../components/icons/KanbanLogo";
import useMediaQuery from "../../hooks/useMediaQuery";
import KanbanTitle from "../../components/icons/KanbanTitle";

export default function AppTitle() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={styles.container}>
      <KanbanLogo />
      {!isMobile && <KanbanTitle className={styles.kanbanTitle} />}
    </div>
  );
}
