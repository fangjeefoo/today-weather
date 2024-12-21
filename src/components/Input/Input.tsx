import styles from "./Input.module.css";

export const Input = () => {
  return (
    <div className={styles["input-group"]}>
      <input
        required
        type="text"
        name="city"
        autoComplete="off"
        className={styles.input}
      />
      <label className={styles["user-label"]}>First Name</label>
    </div>
  );
};
