import React from "react";
import style from "./index.module.css";
import { OrderInterface } from "./../../interface/index";
import StatusColor from "../StatusColor";

const OrderCard: React.FC<{ order: OrderInterface }> = ({ order }) => {
  return (
    <div className={style.orderCard}>
      <div className={style.top}>
        <div className={style.left}>
          <div className={style.imgCont}>
            <img src={order?.img} alt={order?.name} />
          </div>
          <div className={style.orderDet}>
            <h1>{order?.name?.substring(0, 50)}...</h1>
            <p>
              Size: <span>{order?.size}</span>
            </p>
            <p>
              Color: <span>{order?.color}</span>
            </p>
            <div className={style.items}>
              <div className={style.box}>
                <h2>ITEMS:</h2>
                <input type="text" value={order?.items} />
              </div>
              <div className={style.box}>
                <h2>QTY:</h2>
                <input type="text" value={order?.quantity} />
              </div>
            </div>
            <StatusColor status={order?.status} />
          </div>
        </div>
        <div className={style.options}>
          {order?.status === "Package Shipped" ? (
            <p>Track Order</p>
          ) : (
            <p style={{ color: "#C80016" }}>Cancel Order</p>
          )}
          <p>View Cart</p>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={`flex column g5 ${style.orderBottom}`}>
          <h3>ORDER PLACED</h3>
          <p>{order?.date}</p>
        </div>
        <div className={`flex column g5 ${style.orderBottom}`}>
          <h3>TOTAL</h3>
          <p>{order?.total}</p>
        </div>
        <div className={`flex column g5 ${style.orderBottom}`}>
          <h3>DELIVERY ADDRESS</h3>
          <p>{order?.deliveryAddress}</p>
        </div>
        <div className={`flex column g5 ${style.orderBottom}`}>
          <h3>EST. DELIVERY DATE</h3>
          <p>{order?.estDeliveryDate}</p>
        </div>
        <div className={`flex column g5 ${style.orderBottom}`}>
          <h3>ORDER#</h3>
          <p>{order?.orderNo}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
