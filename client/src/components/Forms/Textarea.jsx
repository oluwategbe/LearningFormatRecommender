import React from "react";
import styles from "../styles.module.css";
import { getSentenceFromCamelCase } from "./Helpers";

const Textarea = ({
  className,
  disabled,
  error,
  required,
  label,
  name,
  onChange,
  placeholder,
  style,
  validationHandler,
  value,
  size,
  labelClassName,
}) => {
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    onChange && onChange(name, value);
  };

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    const { value } = event.target;
    let errorMessage = "";
    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };
  return (
    <div className={`${styles.InputContainer} ${styles[size ? size : ""]}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        readOnly={disabled}
        className={`${styles.blackBorder} ${className}`}
        style={style}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
      ></textarea>
    </div>
  );
};

Textarea.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  required: false,
  label: "",
  placeholder: "",
  style: {},
  type: "text",
  validationHandler: () => {},
  size: "large",
  labelClassName: styles.labelBlack,
  value: "",
};

export default Textarea;
