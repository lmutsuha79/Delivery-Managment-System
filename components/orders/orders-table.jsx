import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

const OrdersTable = ({ showUpAddOrderDialog }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        id: "01",
        phoneNumber: "0794082989",
        customerName: "Bakhti Houria",
        moreInfo: "غير في خاطر راه فيها الزاج",
        pickUpLocation: "10 نهج الصومام الكابق الأرضي سيدي بلعباس",
        deliveryLocation: "ثانوية الحواس عن العساس داخل فالليسي",
        createdAt: "new Date()",
        updatedAt: "new Date()",
        deliveredAt: "new Date()",
        money: 350.0,
        status: "in the way",
        deliveryBoy: "Zino Bouabdalah",
        sessionId: 13,
      },
      {
        id: "01",
        phoneNumber: "0794082989",
        customerName: "Bakhti Houria",
        moreInfo: "غير في خاطر راه فيها الزاج",
        pickUpLocation: "10 نهج الصومام الكابق الأرضي سيدي بلعباس",
        deliveryLocation: "ثانوية الحواس عن العساس داخل فالليسي",
        createdAt: "new Date()",
        updatedAt: "new Date()",
        deliveredAt: "new Date()",
        money: 350.0,
        status: "in the way",
        deliveryBoy: "Zino Bouabdalah",
        sessionId: 13,
      },
      {
        id: "01",
        phoneNumber: "0794082989",
        customerName: "Bakhti Houria",
        moreInfo: "غير في خاطر راه فيها الزاج",
        pickUpLocation: "10 نهج الصومام الكابق الأرضي سيدي بلعباس",
        deliveryLocation: "ثانوية الحواس عن العساس داخل فالليسي",
        createdAt: "new Date()",
        updatedAt: "new Date()",
        deliveredAt: "new Date()",
        money: 350.0,
        status: "in the way",
        deliveryBoy: "Zino Bouabdalah",
        sessionId: 13,
      },
    ]);
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">All Orders</span>
      <Button icon="pi pi-plus" rounded raised onClick={showUpAddOrderDialog}>
        <span className="pl-2 text-lg"> create new order</span>
      </Button>
    </div>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <DataTable
      header={header}
      footer={footer}
      value={products}
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
      <Column field="deliveryBoy" header="Deliver Boy"></Column>
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
