import styles from "./WelcomeWarningMessage.module.css";

export default function WelcomeWarningMessage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to Kanban Task Manager!</h2>
      <p className={styles.welcome}>
        This is a practice project developed Liam Vickerstaff
      </p>
      <p className={styles.warning}>Warning!</p>
      <p className={styles.body}>
        This wesbite is not intended to be used as a genuine service. Please
        feel free to explore and use the web app as you would normally. However
        data may be reset or lost to minimize storage and costs due it being for
        practice purposes.
      </p>
      <p className={styles.dismiss}>
        Click any where outside the modal to dismiss this message.
      </p>
    </div>
  );
}
