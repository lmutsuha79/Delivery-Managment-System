import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";

const OrdersTable = ({ showUpAddOrderDialog }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetch_and_set_orders() {
      try {
        const response = await fetch("/api/orders/get-current-orders");
        if (response.ok) {
          const { orders } = await response.json();
          console.log(orders);
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
    fetch_and_set_orders();
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">All Orders</span>
      <Button icon="pi pi-plus" rounded raised onClick={showUpAddOrderDialog}>
        <span className="pl-2 text-lg"> create new order</span>
      </Button>
    </div>
  );
  const footer = `In total there are ${orders ? orders.length : 0} orders.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <DataTable
      header={header}
      footer={footer}
      value={orders}
      tableStyle={{ minWidth: "50rem" }}
      stripedRows
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 25, 50, 100]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      paginatorLeft={paginatorLeft}
      paginatorRight={paginatorRight}
      columnResizeMode="expand"
      resizableColumns
      showGridlines
    >
      <Column field="id" header="Id"></Column>
      <Column field="status" header="Status"></Column>
      <Column
        body={(order) => (
          <div className="flex flex-col items-center gap-2">
            <Avatar
              size="large"
              image={`/images/delivery-boys-avatars/${order.deliveryBoy.avatar}`}
              shape="circle"
            />
            <span>{order.deliveryBoy.name}</span>
          </div>
        )}
        header="Deliver Boy"
      ></Column>
      <Column field="phoneNumber" header="Phone"></Column>
      <Column field="customerName" header="Customer Name"></Column>
      <Column field="pickUpLocation" header="Pick Up Location"></Column>
      <Column field="deliveryLocation" header="Quantity"></Column>
      <Column field="moreInfo" header="More Info"></Column>
      <Column field="createdAt" header="Creation Date"></Column>
      <Column field="deliveredAt" header="Delivred At"></Column>
      <Column field="money" header="Amount"></Column>
    </DataTable>
  );
};

export default OrdersTable;
