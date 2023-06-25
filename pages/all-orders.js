import OrdersTable from "@/components/orders/orders-table";
import { error_toast } from "@/lib/toast-notifications";
import { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/get-all-orders");
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        error_toast("error getting orders", error);
        console.error(error);
      }
    };

    fetchOrders();
  }, []);
  return (
    <>
      <OrdersTable
        tableTitle={"All orders during All the sessions"}
        showSession={true}
        orders={orders}
      />
    </>
  );
};

export default AllOrders;
