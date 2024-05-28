import React from "react";
import styles from "../styles.module.css";
import { getSentenceFromCamelCase } from "./Helpers";

const Select = ({
  className,
  disabled,
  error,
  required,
  label,
  name,
  onChange,
  style,
  data,
  validationHandler,
  value,
  size,
  labelClassName,
  filter,
  filterValue,
  title,
}) => {
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let inputValue;
    inputValue = value;

    onChange && onChange(name, inputValue);
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
    <div className={`${styles.InputContainer} ${styles[size]}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>
      <select
        value={value}
        required={required}
        name={name}
        className={`${styles.blackBorder} ${className}`}
        style={style}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
      >
        <option value="">{label || title}</option>
        {data &&
          data.map((item, i) =>
            filter ? (
              <option value={item[filterValue ? filterValue : ""]} key={i}>
                {item[filter]}
              </option>
            ) : (
              <option value={item.value} key={i}>
                {item.value}
              </option>
            )
          )}
      </select>
    </div>
  );
};

Select.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  required: false,
  label: "",
  placeholder: "",
  style: {},
  data: [],
  validationHandler: () => {},
  size: "medium",
  labelClassName: "labelBlack",
  filter: "",
  filterValue: "",
  value: "",
  title: "",
};

export default Select;
