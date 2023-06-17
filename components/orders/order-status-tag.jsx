import { useEffect, useState } from "react";

const OrderStatusTag = ({ orderText }) => {
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    switch (orderText) {
      case "pending":
        setBgColor(() => "#808080");
        setTextColor(() => "white");
        break;
      case "on_the_road":
        setBgColor(() => "#FFA500");
        setTextColor(() => "white");
        break;

      case "picked_up":
        setBgColor(() => "#0000FF");
        setTextColor(() => "white");
        break;

      case "delivered":
        setBgColor(() => "#00FF00");
        setTextColor(() => "white");
        break;

      case "canceled":
        setBgColor(() => "red");
        setTextColor(() => "white");
        break;

      default:
        setBgColor(() => "white");
        setTextColor(() => "black");
    }
    console.log(bgColor);
  }, [orderText]);
  return (
    <div
      className="flex items-center rounded-md font-medium capitalize  px-3 py-2"
      style={{ background: bgColor, color: textColor }}
    >
      {orderText}
    </div>
  );
};

export default OrderStatusTag;
