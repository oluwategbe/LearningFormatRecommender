import React from "react";
import style from "./index.module.css";
import { FaCaretDown } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className={style.topbar}>
      <div className={style.left}>
        <a href="#/">Shipping</a>
        <a href="#/">FAQ</a>
        <a href="#/">Tracking</a>
      </div>
      <div className={style.right}>
        <p>Hotline +234 83 372 2834</p>
        <div className={style.language}>
          <p>English</p>
          <FaCaretDown />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
