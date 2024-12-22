import styles from "./Input.module.css";
import {FC} from "react";
import CrossIcon from "../../assets/icons/CrossIcon.tsx";

interface InputProps {
  className?: string;
  clearInput?: () => void;
  inputName: string;
  label: string;
  value: string;
  setValue: (value: string) => void
}
export const Input: FC<InputProps> = ({ className, inputName, label, clearInput, value, setValue }) => {

  const onClickClearInput = () => {
    setValue("");
    clearInput?.();
  }

  return (
    <div className={`${styles["input-group"]} ${className}`}>
      <input
        required
        type="text"
        name={inputName}
        autoComplete="off"
        value={value}
        className={styles.input}
        onChange={(event) => { setValue(event.target.value)}}
      />
      {value.length > 0 ? (
          <button type={"button"} className={styles["clear-input-button"]} onClick={onClickClearInput}>
            <CrossIcon/>
          </button>
      ) : null}
      <label htmlFor={inputName} className={styles["user-label"]}>
        {label}
      </label>
    </div>
  );
};
