import { ChangeEvent, FC } from "react";

import styles from "./SWDinput.module.scss";

export type SWDinputProps = {
  id: string;
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  image?: string;
  readOnly?: boolean;
  className?: string;
  showLabel?: boolean;
  variant?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SWDinput: FC<SWDinputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  maxLength = 2,
  image,
  readOnly = false,
  className,
  showLabel = true,
  variant,
  onChange,
}: SWDinputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === "number") {
      if (/^[+]?\d+$/.test(newValue) || newValue === "") {
        if (newValue.length <= maxLength) {
          onChange(e);
        }
      }
    } else {
      onChange(e);
    }
  };

  const pattern = type === "number" ? "\\d*" : undefined;

  return (
    <label className={`${styles.inputWrapper} ${className || ""}`} htmlFor={id}>
      {image && (
        <span className={styles.inputImageWrapper}>
          <img className="" src={image} alt={label} aria-hidden="true" />
        </span>
      )}
      {showLabel && (
        <span className={styles.inputLabelText} id={`label-${id}`}>
          {label}
        </span>
      )}
      <input
        className={`${styles.inputField} ${variant === "vertical" ? styles.vertical : ""}`}
        type={type}
        pattern={pattern}
        id={id}
        step="any"
        min={type === "number" ? 0 : undefined}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-describedby={`label-${id}`}
        disabled={readOnly}
      />
    </label>
  );
};

export default SWDinput;
