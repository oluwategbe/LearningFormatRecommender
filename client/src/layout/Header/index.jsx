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
          <img src={logo} alt="logo" />
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
        <Link to="/app/wishlist">
          <div
            className={`${style["profile"]} ${
              name === "Wishlist" ? style.activeP : undefined
            }
  `}
          >
            <div className={style.circle}>
              <div className={style.noti}>0</div>
              <GoHeartFill />
            </div>
          </div>
        </Link>
        <Link to="/app/cart">
          <div
            className={`${style["profile"]} ${
              name === "Cart" ? style.activeP : undefined
            }
  `}
          >
            <div className={style.circle}>
              <div className={style.noti}>0</div>
              <BsCartFill />
            </div>
          </div>
        </Link>
      </div>
      {/* <div className={style.bottom}>
        <div className={style.shop}>
          <IoMenuOutline />
          <p>SHOP BY CATEGORIES</p>
        </div>
        <div className={style.search}>
          <div className={style.drop}>
            <p>All categories</p>
            <FaCaretDown />
          </div>
          <input type="text" name="" id="" className={style.input}></input>
          <div className={style.btn}>
            <p>Search</p>
          </div>
        </div>
        <div className={style.sales}>
          <p>BLACK FRIDAY SALES</p>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
