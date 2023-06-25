import OrdersTable from "@/components/orders/orders-table";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

const AllSessionsInfo = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/get-all-sessions-info");
        const data = await response.json();
        setSessions(data.sessions);
        console.log(data.sessions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessions();
  }, []);
  const [expandedRows, setExpandedRows] = useState(null);
  const onRowExpand = (event) => {
    //     toast.current.show({
    //       severity: "info",
    //       summary: "Product Expanded",
    //       detail: event.data.name,
    //       life: 3000,
    //     });
  };

  const onRowCollapse = (event) => {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Product Collapsed",
    //       detail: event.data.name,
    //       life: 3000,
    //     });
  };

  const allowExpansion = (rowData) => {
    return rowData.orders.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3 space-y-8">
        <OrdersTable
          tableTitle={`Orders for this session id= ${data.id}) `}
          //     showSession={true}
          orders={data.orders}
        />
        {/* ####################################################"" */}
        <DataTable
          value={data.attendances}
          header={
            <div>
              Showing delivery boys who have checked in during this session (id={" "}
              {data.id})
            </div>
          }
          //     footer={footer}
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column sortable field="id" header="Id"></Column>
          <Column
            field="deliveryBoy.avatar"
            body={(attendance) => (
              <Avatar
                size="large"
                image={`/images/delivery-boys-avatars/${attendance.deliveryBoy.avatar}`}
                shape="circle"
              />
            )}
            header="Avatar"
          ></Column>

          <Column sortable field="deliveryBoy.name" header="Name"></Column>
          <Column sortable field="deliveryBoy.name" header="Name"></Column>
          <Column field="deliveryBoy.phone" header="Phone Number"></Column>
          <Column
            field="createdAt"
            body={(attendance) =>
              new Date(attendance.createdAt).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "numeric",
                //     year: "numeric",
                //     month: "long",
                //     day: "numeric",
              })
            }
            header="CreatedAt"
          ></Column>
        </DataTable>

        {/* ####################################################"" */}

        <DataTable
          value={data.orders}
          header={
            <div>
              Showing delivery boys Completed Orders during this session (id={" "}
              {data.id})
            </div>
          }
          tableStyle={{ minWidth: "60rem" }}
        >
          <Column sortable field="deliveryBoy.id" header="Id"></Column>
          <Column
            field="deliveryBoy.avatar"
            body={(order) => (
              <Avatar
                size="large"
                image={`/images/delivery-boys-avatars/${order.deliveryBoy.avatar}`}
                shape="circle"
              />
            )}
            header="Avatar"
          ></Column>
          <Column sortable field="deliveryBoy.name" header="Name"></Column>

          <Column
            sortable
            header="Delivered Orders"
            body={(order) => {
              const deliveryBoyId = order.deliveryBoy.id;
              const deliveredOrders = data.orders.filter(
                (order) =>
                  order.status === "delivered" &&
                  order.deliveryBoy.id == deliveryBoyId &&
                  order.sessionId == data.id
              );

              return deliveredOrders.length;
            }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2"></div>
  );

  return (
    <>
      <DataTable
        value={sessions}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field="id" header="Id" sortable />
        <Column
          sortable
          header="StartTime"
          field="startTime"
          body={(sessionInfo) =>
            new Date(sessionInfo.startTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          }
        />
        <Column
          sortable
          header="EndTime"
          field="endTime"
          body={(sessionInfo) =>
            new Date(sessionInfo.endTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          }
        />
      </DataTable>
    </>
  );
};

export default AllSessionsInfo;
