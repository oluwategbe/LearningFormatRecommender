import React from "react";
import styles from "../styles.module.css";
import CheckFormValidation from "./Helpers";
import { FormGroupProps } from "../../interface/form";

const FormGroup = ({
  children,
  onSubmit,
  validation = {},
  errors,
  setErrors,
}: FormGroupProps) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
