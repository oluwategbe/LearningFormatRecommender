import React from "react";
import styles from "../styles.module.css";
import CheckFormValidation from "./Helpers";

const FormGroup = ({
  children,
  onSubmit,
  validation = {},
  errors,
  setErrors,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const validationError = CheckFormValidation(errors, validation);

    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
      onSubmit();
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.inputFlex}>{children}</div>
    </form>
  );
};

FormGroup.defaultProps = {
  onSubmit: () => {},
  setErrors: () => {},
  validation: {},
  errors: {},
  className: "",
};

export default FormGroup;
