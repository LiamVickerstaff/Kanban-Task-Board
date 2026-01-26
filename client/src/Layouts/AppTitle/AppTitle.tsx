import { useState } from "react";
import styles from "./AppTitle.module.css";
import KanbanLogo from "../../components/icons/KanbanLogo";

export default function AppTitle() {
  const [isMobileView, setIsMobileView] = useState(true);

  return (
    <div className={styles.container}>
      <KanbanLogo width={24} height={25} />
      {!isMobileView && <h1>kanban</h1>}
    </div>
  );
}
