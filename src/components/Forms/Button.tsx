import React from "react";
import styles from "../styles.module.css";
import { ButtonProps } from "../../interface/form";

const Button = ({
  onClick,
  type = "submit",
  title,
  size,
  bgColor,
  className,
  disabled,
  loading,
  style,
}: ButtonProps) => {
  return (
    <div className={`${styles.InputContainer} ${styles[size ? size : ""]}`}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles[bgColor ? bgColor : ""]} ${className}`}
        disabled={disabled || loading}
        style={style}
      >
        {title}
        {loading && <span className={styles.loading}></span>}
      </button>
    </div>
  );
};

Button.defaultProps = {
  className: "",
  disabled: false,
  loading: false,
  title: "",
  style: {},
  type: "submit",
  size: "medium",
  bgColor: "#1776c4",
};

export default Button;
