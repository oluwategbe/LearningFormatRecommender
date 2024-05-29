import React from "react";
import style from "./index.module.css";
import logo from "../../assets/1.png";
import FooterComponent from "./FooterComponent";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.top}>
        {/* <img src={logo} alt="logo" /> */}
        <h4>Learning Format Recommender</h4>
        <div className={style.sub}>
          <p>
            Subscribe to our newsletter to get updates on our latest offers!
          </p>
          <div className={style.search}>
            <div className={style.input}>Subscribe to our newsletter</div>
            <div className={style.btn}>
              <p>Search</p>
            </div>
          </div>
          <div className={style.check}>
            <input type="checkbox" name="" id="" />
            <p>
              I agree to Lotushop's <a href="#/">Privacy Policy.</a> You can
              unsubscribe from the newsletter at anytime.
            </p>
          </div>
        </div>
        <div className={style.download}>
          <h2>Download Our App</h2>
          <p>
            Download Our App and get extra %15 discount on your first order
            after download
          </p>
        </div>
      </div>
      <div className={style.bottom}>
        <FooterComponent header="LET US HELP YOU" links={help} />
        <FooterComponent header="ABOUT" links={about} />
        <FooterComponent header="MAKE MONEY WITH US" links={make} />
        <FooterComponent header="PAYMENT PRODUCTS" links={payment} />
        <div className={style.follow}>
          <h2>Follow us on</h2>
          <div className={style.social}>
            <div className={style.media}>
              <FaFacebookF />
            </div>
            <div className={style.media}>
              <AiFillInstagram />
            </div>
            <div className={style.media}>
              <FaXTwitter />
            </div>
            <div className={style.media}>
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

const help = [
  { title: "Help Center", link: "/#" },
  { title: "Contact Us", link: "/#" },
  { title: "How to shop on ?", link: "/#" },
  { title: "Delivery options and timelines", link: "/#" },
  { title: "How to return a product on ?", link: "/#" },
  { title: "Corporate and bulk purchases", link: "/#" },
  { title: "Report a Product", link: "/#" },
  { title: "Ship your package anywhere in Nigeria", link: "/#" },
  { title: "Dispute Resolution Policy", link: "/#" },
  { title: "Returns and Refunds Policy", link: "/#" },
];

const about = [
  { title: "About us", link: "/#" },
  { title: "Careers", link: "/#" },
  { title: "Express", link: "/#" },
  { title: "Terms and Conditions", link: "/#" },
  { title: "Privacy Notice", link: "/#" },
  { title: "Cookie Notice", link: "/#" },
  { title: "Global", link: "/#" },
  { title: "Official Stores", link: "/#" },
  { title: "Flash Sales", link: "/#" },
  { title: "Anniversary 2023", link: "/#" },
];

const make = [
  { title: "Sell products", link: "/#" },
  { title: "Sell on Business", link: "/#" },
  { title: "Sell apps on", link: "/#" },
  { title: "Become an Affiliate", link: "/#" },
  { title: "Advertise Your Products", link: "/#" },
  { title: "Self-Publish with Us", link: "/#" },
  { title: "Host", link: "/#" },
];

const payment = [
  { title: "Business Card", link: "/#" },
  { title: "Shop with Points", link: "/#" },
  { title: "Reload Your Balance", link: "/#" },
  { title: "Currency Converter", link: "/#" },
];
