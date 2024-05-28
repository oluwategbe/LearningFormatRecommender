import styles from "../styles.module.css";
import { getRegExp, getSentenceFromCamelCase } from "./Helpers";
import { InputProps } from "../../interface/form";

const Input = ({
  checked,
  className,
  disabled,
  error,
  fixLength,
  required,
  label,
  minLength,
  maxLength,
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
  labelDisplayed,
}: InputProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    let inputValue: string | boolean;

    if (type === "checkbox") {
      inputValue = checked;
    } else {
      inputValue = value;
    }

    onChange && onChange(name, inputValue);
  };
  const onValidationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!validationHandler) return;
    const { value } = event.target;
    let errorMessage = "";

    if (!value && required) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    } else if (minLength && value.length < minLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be at least ${minLength} characters long.`;
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${minLength} characters long.`;
    } else if (fixLength && value.length !== fixLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${fixLength} characters.`;
    } else if (value && reqType) {
      const regExp = getRegExp(reqType) as RegExp; // Type assertion here
      if (!regExp.test(value)) {
        errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
      }
    }

    validationHandler(name, errorMessage);
  };

  return (
    <div className={`${styles.InputContainer} ${size ? styles[size] : ""}`}>
      {labelDisplayed && <label htmlFor={name} className={labelClassName}>
        {label}
        {required && <span className={styles.required}>&nbsp;*</span>}
        {error ? (
          <span className={`${styles.required} ${styles.textSmall}`}>
            {error}
          </span>
        ) : null}
      </label>}
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
      />
    </div>
  );
};

Input.defaultProps = {
  checked: false,
  className: "",
  disabled: false,
  error: "",
  fixLength: 0,
  required: false,
  label: "",
  minLength: 0,
  maxLength: 0,
  placeholder: "",
  reqType: "",
  style: {},
  type: "text",
  validationHandler: () => {},
  size: "medium",
  labelClassName: styles.labelBlack,
  value: "",
  id: "",
  labelDisplayed:true,
};

export default Input;
