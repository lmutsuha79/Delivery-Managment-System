import AddOrderDialog from "@/components/orders/add-order-dialog";
import OrdersTable from "@/components/orders/orders-table";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../_app";

const Orders = () => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);

  const [addOrderDialogVisibility, setAddOrderDialogVisibility] =
    useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersToken, setOrdersToken] = useState(0);
  function changeOrdersToken() {
    setOrdersToken((prev) => prev + 1);
  }

  function sortOrders(orders) {
    const sortedArray = [...orders];
    const statusOrder = [
      "pending",
      "on_the_road",
      "picked_up",
      "delivered",
      "cancelled",
    ];
    sortedArray.sort((a, b) => {
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();
      const indexA = statusOrder.indexOf(statusA);
      const indexB = statusOrder.indexOf(statusB);

      if (indexA < indexB) {
        return -1;
      } else if (indexA > indexB) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }
  useEffect(() => {
    async function fetch_and_set_current_orders() {
      try {
        const response = await fetch("/api/orders/get-current-orders", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: currentSession.sessionId }),
        });
        if (response.ok) {
          const { orders } = await response.json();
          const sorted_orders = sortOrders(orders);
          console.log(sorted_orders)
          setOrders(sorted_orders);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch orders");
      }
    }
    if (currentSession.sessionId) {
      fetch_and_set_current_orders();
    }
  }, [currentSession, ordersToken]);

  function showUpAddOrderDialog() {
    setAddOrderDialogVisibility(true);
  }

  return (
    <div>
      {addOrderDialogVisibility && (
        <AddOrderDialog
          addOrderDialogVisibility={addOrderDialogVisibility}
          setAddOrderDialogVisibility={setAddOrderDialogVisibility}
          changeOrdersToken={changeOrdersToken}
        />
      )}

      <OrdersTable
        changeOrdersToken={changeOrdersToken}
        tableTitle={"The Orders For The Curret Session"}
        showUpAddOrderDialog={showUpAddOrderDialog}
        orders={orders}
      />
    </div>
  );
};

export default Orders;
