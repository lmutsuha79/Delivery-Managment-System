import ToggleButton from "@/components/toggle-button";
import { fetchDeliveryBoys } from "@/lib/fetch-delivery-boys";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

const boysAttendance = () => {
  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  useEffect(() => {
    fetchDeliveryBoys().then((boys) => setDeliveryBoysList(boys));
  }, []);
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
        <Column field="status" header="Status" body={(target) => <ToggleButton />}></Column>
      </DataTable>
    </div>
  );
};

export default boysAttendance;
