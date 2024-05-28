import React from "react";
import feat from "./index.module.css";
import Ratings from "../../modules/LandingPage/Component/Ratings/Ratings";
import Button from "../../modules/LandingPage/Component/Button/Button";

const FeaturedCard = ({ product }: any) => {
  const handleRatingChange = (value: number) => {
    product.initialRating = value;
  };

  return (
    <div className={feat.featuredWrapper}>
      <div className={feat.featuredHeader}>
        <div className={feat.featuredDiscount}>
          <p>{product.discount}</p>
        </div>
        <div className={feat.featuredStatus}>
          <p>{product.status}</p>
        </div>
      </div>

      <div className={feat.featuredContent}>
        <img src={product.img} alt="Product" />
        <p className={feat.sub}>{product.sub}</p>
        <h3>{product.name}</h3>
        <Ratings
          initialRating={product.initialRating}
          onChange={(value) => handleRatingChange(value)}
        />
        <p className={feat.productPrice}>
          {product.newPrice} <span>{product.oldPrice}</span>
        </p>
      </div>

      <div className={feat.buttons}>
        <Button
          style={{ background: "#C80016", color: "white" }}
          text="Buy Now"
        />
        <Button
          style={{ background: "#FCC536", color: "black" }}
          text="Add To Cart"
        />
      </div>
    </div>
  );
};

export default FeaturedCard;
