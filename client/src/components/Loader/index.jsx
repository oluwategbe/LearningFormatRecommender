import * as React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#9c2780"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
      <p>Loading....</p>
    </div>
  );
};

export default Loader;
