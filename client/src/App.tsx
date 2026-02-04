import styles from "./App.module.css";
import RootModal from "./components/modals/RootModal/RootModal";
import AppTitle from "./Layouts/AppTitle/AppTitle";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import Topbar from "./Layouts/Topbar/Topbar";
import "./styles/variables.css";
import useSidebarStore from "./stores/useSidebarStore";
import OpenSidebarButton from "./components/OpenSidebarButton/OpenSidebarButton";
import Sidebar from "./Layouts/Sidebar/Sidebar";
import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const sidebarIsOpen = useSidebarStore((s) => s.isOpen);

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={styles.container}>
      <RootModal />
      <div className={styles.topGroup}>
        <AppTitle />
        <Topbar />
      </div>
      <div className={styles.bottomGroup}>
        {sidebarIsOpen ? <Sidebar /> : !isMobile ? <OpenSidebarButton /> : null}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
