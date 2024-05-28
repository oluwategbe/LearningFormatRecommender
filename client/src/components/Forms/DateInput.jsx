import React from "react";
import styles from "../styles.module.css";
import { getRegExp, getSentenceFromCamelCase } from "./Helpers";

const DateInput = ({
  checked,
  className,
  disabled,
  error,
  fixLength,
  required,
  label,
  min,
  max,
  name,
  onChange,
  placeholder,
  reqType,
  style,
  type,
  validationHandler,
  value,
  size,
  labelClassName,
}) => {
  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    let inputValue;

    if (type === "checkbox") {
      inputValue = checked;
    } else {
      inputValue = value;
    }

    onChange && onChange(name, inputValue);
  };

  const onValidationChange = (event) => {
    event.currentTarget.type = "text";
    if (!validationHandler) return;
    const { value } = event.target;
    let errorMessage = "";
    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    } else if (value && reqType) {
      const regExp = getRegExp(reqType); // Type assertion here
      if (!regExp.test(value)) {
        errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
      }
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
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        checked={checked}
        placeholder={placeholder}
        className={`${styles.blackBorder} ${className}`}
        required={required}
        style={style}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
        onFocus={(e) => (e.currentTarget.type = "date")}
        min={min}
        max={max}
      />
    </div>
  );
};

DateInput.defaultProps = {
  checked: false,
  className: "",
  disabled: false,
  error: "",
  fixLength: 0,
  required: false,
  label: "",
  min: "",
  max: "",
  placeholder: "",
  reqType: "",
  style: {},
  type: "text",
  validationHandler: () => {},
  size: "medium",
  labelClassName: styles.labelBlack,
  value: "",
};

export default DateInput;
