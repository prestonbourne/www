import styles from "./style.module.css";

export function Switch() {
  return (
    <input
      type="checkbox"
      role="switch"
      className={styles.switch}
      aria-label="Toggle switch"
    />
  );
}
