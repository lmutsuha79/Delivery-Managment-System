import ToggleButton from "@/components/toggle-button";
import { fetchDeliveryBoys } from "@/lib/fetch-delivery-boys";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../_app";
import { error_toast, sucess_toast } from "@/lib/toast-notifications";

const boysAttendance = () => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);

  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  useEffect(() => {
    fetchDeliveryBoys().then((boys) => setDeliveryBoysList(boys));
  }, []);

  async function handleSetPresent(boyId) {
    try {
      const response = await fetch(`/api/attendance/set-present`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: currentSession.sessionId,
          deliveryBoyId: boyId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        error_toast(errorData.error);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      sucess_toast(`Delivery boy marked as present`);
      console.log(data);
      // return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async function handleTurnStatusOff(boyId) {
    try {
      const response = await fetch(`/api/attendance/turn-off-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: currentSession.sessionId,
          deliveryBoyId: boyId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        error_toast("error" + errorData);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      sucess_toast(`Delivery boy status changed`);
      console.log(data);
      // return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">List Of Deliver Boys</span>
    </div>
  );
  const footer = `In total there are ${
    deliveryBoysList ? deliveryBoysList.length : 0
  } delivery boys.`;
  return (
    <div>
      <DataTable
        value={deliveryBoysList}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column
          header="avatar"
          body={(target) => (
            <Avatar
              size="large"
              image={`/images/delivery-boys-avatars/${target.avatar}`}
              shape="circle"
            />
          )}
        ></Column>
        <Column field="phone" header="Pone"></Column>
        <Column
          field="status"
          header="Status"
          body={(target) => (
            <ToggleButton
              boyId={target.id}
              handleSetPresent={handleSetPresent}
              handleSetAbsent={handleTurnStatusOff}
              currentSession={currentSession}
            />
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default boysAttendance;
