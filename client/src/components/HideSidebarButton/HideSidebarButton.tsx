import useSidebarStore from "../../stores/useSidebarStore";
import CloseSidebarIcon from "../icons/CloseSidebarIcon";
import styles from "./HideSidebarButton.module.css";

export default function HideSidebarButton() {
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);

  return (
    <button className={styles.container} onClick={toggleSidebar}>
      <CloseSidebarIcon />
      <p className="headingM">Hide Sidebar</p>
    </button>
  );
}
