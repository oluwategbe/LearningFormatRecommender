import React from "react";
import "./index.css";
import Topbar from "./Topbar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, name }) => {
  return (
    <div className="userLayout">
      <Topbar />
      <Header name={name} />
      <div className="userChildren">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
