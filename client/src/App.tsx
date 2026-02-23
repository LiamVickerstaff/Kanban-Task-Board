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
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import WelcomePage from "./Layouts/WelcomeMessage/WelcomePage";
import { setupAxiosAuth } from "./api/setupAxiosAuth";
import api from "./api/apiMethods";

function App() {
  const { isOpen: sidebarIsOpen, openSideBar } = useSidebarStore();
  const isMobile = useMediaQuery("(max-width: 767px)");
  // const userId = "a17d0c20-36ca-4cbd-9f72-72a6f55bb89a";

  const { getToken } = useAuth();

  // Set up axios client on initial app load to intercept fetch requests and responses
  useEffect(() => {
    setupAxiosAuth(getToken);
  }, [getToken]);

  useEffect(() => {
    const testFetch = () => {
      return api.get(`/test`);
    };

    console.log("calling testFetch() ");

    testFetch();
  }, []);

  // If not on mobile, open sidebar by default
  useEffect(() => {
    if (!isMobile) {
      openSideBar();
    }
  }, [isMobile]);

  return (
    <div className={styles.container}>
      <RootModal />
      <SignedOut>
        <WelcomePage />
      </SignedOut>
      <SignedIn>
        <div className={styles.topGroup}>
          <AppTitle />
          <Topbar />
        </div>
        <div className={styles.bottomGroup}>
          {sidebarIsOpen ? (
            <Sidebar />
          ) : !isMobile ? (
            <OpenSidebarButton />
          ) : null}
          <Dashboard />
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
