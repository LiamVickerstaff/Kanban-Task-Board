import { useEffect, useState } from "react";
import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import styles from "./LightDarkSwitch.module.css";
import { motion } from "motion/react";

export default function LightDarkSwitch() {
  const [isLightTheme, setIsLightTheme] = useState(
    localStorage.getItem("theme") !== "dark",
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isLightTheme) {
      root.removeAttribute("theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightTheme]);

  return (
    <div className={styles.container}>
      <SunIcon />
      <button
        className={styles.switch}
        style={{
          justifyContent: isLightTheme ? "flex-start" : "flex-end",
        }}
        onClick={() => setIsLightTheme((prev) => !prev)}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`${styles.circle} ${isLightTheme ? styles.light : styles.dark}`}
        ></motion.div>
      </button>
      <MoonIcon />
    </div>
  );
}
