import React, { Fragment, useContext, useState } from "react";
import style from "./header.module.css";
import { userLinks } from "./link";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import logo from "../../assets/1.png";
import { AuthContext } from "../../context";
import { GoHeartFill } from "react-icons/go";

const hasPermission = (allowed) => allowed.includes("User");

const Header = ({ name }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const { user } = useContext(AuthContext);

  const toggleHandler = (id) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [id]: !prevExpandedItems[id],
    }));
  };

  return (
    <div className={style.header}>
      <div className={style.top}>
        <Link to="/app/dashboard">
          {/* <img src={logo} alt="logo" /> */}
          <h4>Learning Format Recommender</h4>
        </Link>
        <ul className={style.links}>
          {userLinks?.map((item, i) => (
            <Fragment key={i}>
              {hasPermission(item.allowed) && (
                <Fragment key={i}>
                  {item.children ? (
                    <div className={style.childContainer}>
                      <li
                        className={
                          name === item.name ? style.active : undefined
                        }
                        onClick={() => toggleHandler(i)}
                      >
                        <span>
                          {item.name}
                          &nbsp;&nbsp;
                          <FaCaretDown />
                        </span>
                      </li>
                      {expandedItems[i] && (
                        <div className={style.child}>
                          <ul>
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex}>
                                <Link to={child.route}>{child.name}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <li
                      key={i}
                      className={name === item.name ? style.active : undefined}
                    >
                      <Link to={item.route}>{item.name}</Link>
                    </li>
                  )}
                </Fragment>
              )}
            </Fragment>
          ))}
          <Link to="/app/profile">
            <div
              className={`${style["profile"]} ${
                name === "Profile" ? style.activeP : undefined
              }
  `}
            >
              <div className={style.circle}>
                <IoPersonSharp />
              </div>
              <p>Hi, {user?.firstname}</p>
              <FaCaretDown />
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
