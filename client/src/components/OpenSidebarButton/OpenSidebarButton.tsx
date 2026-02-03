import useSidebarStore from "../../stores/useSidebarStore";
import OpenSidebarIcon from "../icons/OpenSidebarIcon";
import styles from "./OpenSidebarButton.module.css";

export default function OpenSidebarButton() {
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);

  return (
    <button className={styles.container} onClick={toggleSidebar}>
      <OpenSidebarIcon />
    </button>
  );
}
