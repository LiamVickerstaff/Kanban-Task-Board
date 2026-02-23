import { SignIn } from "@clerk/clerk-react";
import styles from "./WelcomePage.module.css";
import KanbanLogo from "../../components/icons/KanbanLogo";
import { useEffect } from "react";
import useModalStore from "../../stores/useModalStore";
import WelcomeWarningMessage from "../../components/modals/WelcomeWarningMessage/WelcomeWarningMessage";

export default function WelcomePage() {
  const openModal = useModalStore((s) => s.open);

  useEffect(() => {
    openModal(<WelcomeWarningMessage />);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftGroup}>
          <div className={styles.title}>
            <KanbanLogo />
            <h1 className="headingXL"> Kanban Task Manager</h1>
          </div>
          <p className={`bodyL ${styles.body}`}>
            Welcome to the Kanban Task Manager app. Here you can keep track of
            all your tasks and group them into boards to stay on top of your
            projects.
          </p>
        </div>
        <div className={styles.rightGroup}>
          <SignIn appearance={clerkSignInAppearance} />
        </div>
      </div>
    </div>
  );
}

const clerkSignInAppearance = {
  elements: {
    rootBox: {
      width: "100%",
      alignSelf: "center",
    },
    cardBox: {
      width: "32rem",
      justifySelf: "center",
    },
    headerTitle: {
      fontSize: "1.6rem",
    },
    headerSubtitle: {
      fontSize: "1.1rem",
    },
    main: {
      gap: 0,
    },
    socialButtons: {
      gap: "0.8rem",
      display: "flex",
      flexDirection: "column-reverse",
    },
    socialButtonsBlockButton: {
      paddingBlock: "0.8rem",
    },
    socialButtonsBlockButtonText: {
      fontSize: "1.4rem",
      fontWeight: "700",
    },
    socialButtonsProviderIcon: {
      width: "20px",
      height: "20px",
      minWidth: "20px",
      minHeight: "20px",
      flexShrink: 0,
    },
    footerActionText: {
      fontSize: "1.2rem",
    },
    footerActionLink: {
      fontSize: "1.2rem",
    },
  },
};
