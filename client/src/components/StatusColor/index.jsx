import style from "./index.module.css";

const StatusColor = ({ status = "" }) => {
  let bg;
  switch (status) {
    case "Completed":
      bg = "#41D447DE";
      break;
    case "Pending":
      bg = "#FCC53640";
      break;
    case "Cancelled":
      bg = "#FF5063";
      break;
    case "Pending Confirmation":
      bg = "#FCC53640";
      break;
    case "Order Confirmed":
      bg = "#41D4475E";
      break;
    case "Package Shipped":
      bg = "#41D447DE";
      break;
    default:
      bg = "#ffffff";
  }
  return (
    <span
      style={{
        background: bg,
      }}
      className={style.btn}
    >
      {status}
    </span>
  );
};

export default StatusColor;
