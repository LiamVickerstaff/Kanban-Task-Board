import styles from "./App.module.css";
import RootModal from "./components/modals/RootModal/RootModal";
import AppTitle from "./Layouts/AppTitle/AppTitle";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import Topbar from "./Layouts/Topbar/Topbar";
import "./styles/variables.css";
import useSidebarStore from "./stores/useSidebarStore";
import OpenSidebarButton from "./components/OpenSidebarButton/OpenSidebarButton";
import Sidebar from "./Layouts/Sidebar/Sidebar";

function App() {
  const sidebarIsOpen = useSidebarStore((s) => s.isOpen);

  return (
    <div className={styles.container}>
      <RootModal />
      <div className={styles.topGroup}>
        <AppTitle />
        <Topbar />
      </div>
      <div className={styles.bottomGroup}>
        {sidebarIsOpen ? <Sidebar /> : <OpenSidebarButton />}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
