import AddOrderDialog from "@/components/orders/add-order-dialog";
import OrdersTable from "@/components/orders/orders-table";
import { useState } from "react";

const Orders = () => {
  // the admin recive the order and mark the info
  // the admin asign the orders to one of the availble delivery boys
  // the delivery boy reaches to pickup location
  // deliveryboy confirms and pick the order
  // deliveryboy reach the destination and delivery courier and pay

  // in this difrence layer the admin can mark the order with flag depending on the
  // status of the order done!,picked...
  const [addOrderDialogVisibility, setAddOrderDialogVisibility] =
    useState(false);
  function showUpAddOrderDialog() {
    setAddOrderDialogVisibility(true);
  }
  return (
    <div>
      <AddOrderDialog
        addOrderDialogVisibility={addOrderDialogVisibility}
        setAddOrderDialogVisibility={setAddOrderDialogVisibility}
      />
      <OrdersTable showUpAddOrderDialog={showUpAddOrderDialog} />
    </div>
  );
};

export default Orders;
