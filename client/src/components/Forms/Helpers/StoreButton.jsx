import React from "react";
import styles from "../../styles.module.css";

const StoreButton = ({
  onClick,
  type = "submit",
  title,
  size,
  bgColor,
  className,
  disabled,
  loading,
  style,
  icon,
}) => {
  return (
    <div
      className={`${styles.storeInputContainer} ${styles[size ? size : ""]}`}
    >
      <button
        type={type}
        onClick={onClick}
        className={`${styles[bgColor ? bgColor : ""]} ${className}`}
        // className={styles.storeInputContainer}
        disabled={disabled || loading}
        style={style}
      >
        {title}
        {/* Display icon if provided */}
        {icon && <img src={icon} alt="icon" className={styles.icon} />}
        {loading && <span className={styles.loading}></span>}
      </button>
    </div>
  );
};

StoreButton.defaultProps = {
  className: "",
  disabled: false,
  loading: false,
  title: "",
  style: {},
  type: "submit",
  size: "medium",
  //   bgColor: "#1776c4",
};

export default StoreButton;
