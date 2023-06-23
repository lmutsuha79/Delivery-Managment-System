import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "primereact/avatar";
import { SessionContext } from "@/pages/_app";
import OrderStatusTag from "./order-status-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faRefresh,
  faSearch,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import EdditOrderDialog from "./eddit-order-dialog";
import ChangeOrderStatus from "./change-order-status";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import OrderInfoDialog from "./order-info-dialog";

const OrdersTable = ({
  showUpAddOrderDialog,
  tableTitle,
  orders,
  changeOrdersToken,
}) => {
  const [showOrderInfoDialogVisibility, setShowOrderInfoDialogVisibility] =
    useState(false);
  const [currentShowOrderData, setCurrentShowOrderData] = useState(null);

  function handleShowOrderInfo(order) {
    setCurrentShowOrderData(order);
    setShowOrderInfoDialogVisibility(true);
  }
  const [edditOrderDialogStatus, setEdditOrderDialogStatus] = useState(false);
  const [currentEditbleOrderData, setCurrentEditbleOrderData] = useState(null);
  function handleEditOrder(order) {
    setCurrentEditbleOrderData(order);
    setEdditOrderDialogStatus(true);
  }

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">{tableTitle}</span>
      <Button icon="pi pi-plus" rounded raised onClick={showUpAddOrderDialog}>
        <span className="pl-2 text-lg"> create new order</span>
      </Button>
      <div className="flex justify-end items-center">
        <span className="p-input-icon-left">
          <FontAwesomeIcon icon={faSearch} />
          <InputText
            className="border-main_dark ring-black focus:ring-black"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search any thing here ..."
          />
        </span>
      </div>
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
      {showOrderInfoDialogVisibility && (
        <OrderInfoDialog
          showOrderInfoDialogVisibility={showOrderInfoDialogVisibility}
          setShowOrderInfoDialogVisibility={setShowOrderInfoDialogVisibility}
          currentShowOrderData={currentShowOrderData}
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
        filters={filters}
        filterDisplay="row"
        globalFilterFields={[
          "phoneNumber",
          "customerName",
          "deliveryBoy.name",
          "status",
          "id",
          "moreInfo",
          "deliveryLocation",
          "pickUpLocation",
          "money",
        ]}
        emptyMessage="no results found"
      >
        <Column
          header="Actions"
          body={(order) => (
            <div className="flex items-center gap-2">
              <button
                disabled={order.status === "delivered"}
                style={{cursor: order.status === "delivered" ? "not-allowed" : "pointer"}}
                onClick={() => handleEditOrder(order)}
              >
                <FontAwesomeIcon
                  className="text-gray-700 hover:scale-110 transition-transform transform"
                  icon={faEdit}
                />
              </button>
              <button onClick={() => handleShowOrderInfo(order)}>
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-gray-700 hover:scale-110 transition-transform transform"
                />
              </button>
            </div>
          )}
        ></Column>
        <Column field="id" header="Id" sortable></Column>
        <Column
          sortable
          field="status"
          body={(order) => <OrderStatusTag orderText={order.status} />}
          header="Status"
          style={{ minWidth: "12rem" }}
        ></Column>
        <Column
          sortable
          field="deliveryBoy"
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
        <Column sortable field="customerName" header="Customer Name"></Column>
        <Column field="pickUpLocation" header="Pick Up Location"></Column>
        <Column field="deliveryLocation" header="Quantity"></Column>
        <Column sortable field="money" header="Money"></Column>

        <Column
          field="moreInfo"
          body={(order) => <pre>{order.moreInfo}</pre>}
          header="More Info"
        ></Column>
        <Column
          sortable
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
          sortable
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
      </DataTable>
    </>
  );
};

export default OrdersTable;
