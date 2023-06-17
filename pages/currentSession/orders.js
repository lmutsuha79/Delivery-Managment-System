import AddOrderDialog from "@/components/orders/add-order-dialog";
import OrdersTable from "@/components/orders/orders-table";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../_app";

const Orders = () => {
  const [addOrderDialogVisibility, setAddOrderDialogVisibility] =
    useState(false);
  const { currentSession, setCurrentSession } = useContext(SessionContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetch_and_set_orders() {
      try {
        const response = await fetch("/api/orders/get-current-orders", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: currentSession.sessionId }),
        });
        if (response.ok) {
          const { orders } = await response.json();
          setOrders(orders);
          // return data.orders;
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch orders");
      }
    }
    if (currentSession.sessionId) {
      fetch_and_set_orders();
    }
  }, [currentSession]);

  function showUpAddOrderDialog() {
    setAddOrderDialogVisibility(true);
  }
  return (
    <div>
      <AddOrderDialog
        addOrderDialogVisibility={addOrderDialogVisibility}
        setAddOrderDialogVisibility={setAddOrderDialogVisibility}
      />
      <OrdersTable
        tableTitle={"The Orders For The Curret Session"}
        showUpAddOrderDialog={showUpAddOrderDialog}
        orders={orders}
      />
    </div>
  );
};

export default Orders;
