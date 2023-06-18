import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { SessionContext } from "@/pages/_app";
import OrderStatusTag from "./order-status-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRefresh } from "@fortawesome/free-solid-svg-icons";
import EdditOrderDialog from "./eddit-order-dialog";
import ChangeOrderStatus from "./change-order-status";

const OrdersTable = ({
  showUpAddOrderDialog,
  tableTitle,
  orders,
  changeOrdersToken,
}) => {
  // const [changeStatusDialogVisibility, setChangeStatusDialogVisibility] =
  //   useState(false);
  const [edditOrderDialogStatus, setEdditOrderDialogStatus] = useState(false);
  const [currentEditbleOrderData, setCurrentEditbleOrderData] = useState(null);
  function handleEditOrder(order) {
    setCurrentEditbleOrderData(order);
    setEdditOrderDialogStatus(true);
  }

  // useEffect(() => {
  //   console.log("order changed");
  // }, [currentEditbleOrderData]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{tableTitle}</span>
      <Button icon="pi pi-plus" rounded raised onClick={showUpAddOrderDialog}>
        <span className="pl-2 text-lg"> create new order</span>
      </Button>
    </div>
  );
  const footer = `In total there are ${orders ? orders.length : 0} orders.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <>
      {edditOrderDialogStatus && (
        <EdditOrderDialog
          changeOrdersToken={changeOrdersToken}
          setEdditOrderDialogStatus={setEdditOrderDialogStatus}
          edditOrderDialogStatus={edditOrderDialogStatus}
          currentEditbleOrderData={currentEditbleOrderData}
        />
      )}
      {/* <ChangeOrderStatus
        setChangeStatusDialogVisibility={setChangeStatusDialogVisibility}
        changeStatusDialogVisibility={changeStatusDialogVisibility}
      /> */}
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
        <Column
          body={(order) => (
            <button onClick={() => handleEditOrder(order)} className="">
              <FontAwesomeIcon
                className="text-gray-700 hover:scale-110 transition-transform transform"
                icon={faEdit}
              />
            </button>
          )}
          header="Eddit"
        ></Column>
        <Column field="id" header="Id"></Column>
        <Column
          body={(order) => <OrderStatusTag orderText={order.status} />}
          header="Status"
        ></Column>
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
        <Column
          body={(order) => {
            return new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            });
          }}
          header="Creation Date"
        ></Column>
        <Column
          body={(order) => {
            return new Date(order.deliveredAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            });
          }}
          header="Delivred At"
        ></Column>
        <Column field="money" header="Amount"></Column>
      </DataTable>
    </>
  );
};

export default OrdersTable;
