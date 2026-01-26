import styles from "./App.module.css";
import AppTitle from "./Layouts/AppTitle/AppTitle";
import Dashboard from "./Layouts/Dashboard/Dashboard";
import Topbar from "./Layouts/Topbar/Topbar";
import "./styles/variables.css";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.topGroup}>
        <AppTitle />
        <Topbar />
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
