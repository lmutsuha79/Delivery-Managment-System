// khlas page:
// create a page for khlase
// create a column in the table of delivery boy and name it (unpaid amount)
// every time the delivery boy delivers an order the money added to the upaid amount
// when the admin needs to give the delivery boys thier money he entre this page
// and he will see a table of delivery boys and thier unpaid balance
// so he can now paid theme and click on pay
// in this moment the unpaid amount will return to 0
// and a new row will be created in the table called (payments)
// this table will contains every payment (id,crated_at,delivery_boy_id,paid_amount)

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../_app";
import { Avatar } from "primereact/avatar";

const MoneyForCurentSession = () => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);
  const [earningsInfo, setEarningsInfo] = useState();
  useEffect(() => {
    async function get_set_DeliveryBoysEarningInfo() {
      const res = await fetch("/api/money/get-current-money-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: currentSession.sessionId }),
      });
      const { deliveryBoysWithEarnings } = await res.json();
      console.log(deliveryBoysWithEarnings);
      setEarningsInfo(deliveryBoysWithEarnings);
    }
    if (currentSession.sessionId) {
      get_set_DeliveryBoysEarningInfo();
    }
  }, [currentSession]);
  const tableHeader = (
    <div className="">
      <h4>Total Earning Of Delivery Boys In This Session</h4>
      <span className="text-primary_color">
        Note That Only Delivery Boys Presented In this Session Will Appear Here{" "}
      </span>
    </div>
  );
  return (
    <div>
      <DataTable
        header={tableHeader}
        value={earningsInfo}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="deliveryBoy.id" header="Id"></Column>
        <Column field="deliveryBoy.name" header="Name"></Column>
        <Column
          field="deliveryBoy.avatar"
          body={(item) => (
            <Avatar
              image={`/images/delivery-boys-avatars/${item.deliveryBoy.avatar}`}
              shape="circle"
              size="large"
            />
          )}
          header="Avatar"
        ></Column>
        <Column
          field="completedOrders"
          body={(item) => (
            <span className="block ml-12">{item.completedOrders}</span>
          )}
          header="Completed Orders"
        ></Column>
        <Column
          field="earnings"
          body={(item) => (
            <span className="block ml-2">{item.earnings + " " + "DA"}</span>
          )}
          header="Total Earned"
        ></Column>
        <Column
          field="Profite"
          body={(item) => (
            <span className="block ml-2">
              {item.completedOrders * item.deliveryBoy.profiteForEveryDelivery +
                " " +
                "DA"}
            </span>
          )}
          header="Profite"
        ></Column>
      </DataTable>
    </div>
  );
};

export default MoneyForCurentSession;
