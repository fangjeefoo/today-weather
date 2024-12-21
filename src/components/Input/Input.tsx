import styles from "./Input.module.css";
import {FC} from "react";

interface InputProps {
  className?: string;
  inputName: string;
  label: string;
}
export const Input: FC<InputProps> = ({ className, inputName, label}) => {
  return (
    <div className={`${styles["input-group"]} ${className}`}>
      <input
        required
        type="text"
        name={inputName}
        autoComplete="off"
        className={styles.input}
      />
      <label htmlFor={inputName} className={styles["user-label"]}>{label}</label>
    </div>
  );
};
