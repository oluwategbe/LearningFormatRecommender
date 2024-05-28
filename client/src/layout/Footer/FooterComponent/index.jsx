import React from "react";
import style from "./index.module.css";

const FooterComponent = ({ header, links }) => {
  return (
    <div className={style.footerLinks}>
      <h2>{header}</h2>
      <ul>
        {links?.map((link, i) => (
          <a key={i} href={link?.link}>
            {link?.title}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default FooterComponent;
