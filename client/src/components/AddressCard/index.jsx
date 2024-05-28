import React from "react";
import style from "./index.module.css";

interface Address {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  phone2: string;
  address: string;
  state: string;
  city: string;
  default?: boolean; // Make default property optional
}
const AddressCard: React.FC<{ address: Address }> = ({ address }) => {
  return (
    <div className={style.addressCard}>
      <h1>
        {address?.firstname} {address?.lastname}
      </h1>
      <p>{address?.address}</p>
      {address?.default && <span>Default Address</span>}
    </div>
  );
};

export default AddressCard;
