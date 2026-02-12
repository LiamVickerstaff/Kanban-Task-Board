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
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api/domains/user";
import { useUserStore } from "./stores/useUserStore";
// import { useMutation } from "@tanstack/react-query";
// import { createUser } from "./api/domains/user";

function App() {
  const { isOpen: sidebarIsOpen, openSideBar } = useSidebarStore();
  const setUser = useUserStore((s) => s.setUser);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const userId = "a17d0c20-36ca-4cbd-9f72-72a6f55bb89a";

  // If not on mobile, open sidebar by default
  useEffect(() => {
    if (!isMobile) {
      openSideBar();
    }
  }, [isMobile]);

  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 3,
  });

  useEffect(() => {
    if (!data) return;
    
    console.log("Fetched User nice: ", data);
    setUser(data);
  }, [data]);

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
