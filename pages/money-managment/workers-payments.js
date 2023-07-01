// khlas page:
// create a page for khlase
// create a column in the table of delivery boy and name it (unpaid amount)
// every time the delivery boy delivers an order the money added to the upaid amount
// when the admin needs to give the delivery boys thier money he entre this page
// and he will see a table of delivery boys and thier unpaid balance
// so he can now paid theme and click on pay
// in this moment the unpaid amount will return to 0
// and a new row will be created in the table called (payments)

import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../_app";
import { fetchDeliveryBoys } from "@/lib/fetch-delivery-boys";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { error_toast, sucess_toast } from "@/lib/toast-notifications";
import { Dialog } from "primereact/dialog";

// this table will contains every payment (id,crated_at,delivery_boy_id,paid_amount)
const WorkersPayments = () => {
  const [boysListToken, setBoysListToken] = useState(0);
  function changeBoysListToken() {
    setBoysListToken((prev) => prev + 1);
  }

  const { currentSession, setCurrentSession } = useContext(SessionContext);

  const header = (
    <div className="">
      <h4>Payment Section For Delivery Workers</h4>
      <span className="text-primary_color">
        {/* here you will see each delivery boy associated with the unpaid amount */}
      </span>
    </div>
  );
  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  useEffect(() => {
    async function get_and_set_delivery_boys_money_info() {
      const res = await fetch("/api/money/get-boys-money-info");
      const data = await res.json();
      setDeliveryBoysList(data);
    }

    get_and_set_delivery_boys_money_info();
    console.log(deliveryBoysList);
  }, [currentSession, boysListToken]);
  async function handleSubmitPayment(boy) {
    try {
      const response = await fetch("/api/money/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryBoyId: boy.id, amount: boy.unpaid }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response data
        sucess_toast("payment bill created successfully");
        changeBoysListToken();
      } else {
        const errMessage = await response.json();
        error_toast("Error:" + errMessage.error);
        throw new Error(errMessage);
      }
    } catch (error) {
      console.error("Error:", error.error);
    }
  }
  const [selectedBoy, setSelectedBoy] = useState();
  // function handleConfirmeSubmitNewPayment(boy) {
  // }

  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          handleSubmitPayment(selectedBoy);
          setVisible(false);
        }}
        autoFocus
      />
    </div>
  );
  return (
    <>
      {visible && (
        <Dialog
          header="Payment Confirmation"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          footer={footerContent}
        >
          <p className="text-lg">
            Are you sure that you want to create new paymen bill for delivery
            boy: <span className="font-medium text-lg">{selectedBoy.name}</span>
          </p>
          <p className="font-medium text-primary_color">
            {" "}
            Note that after submitting this action a new payment bill will added
            to the payments table and the unpaid value of this delivery boy will
            resets to 0
          </p>
        </Dialog>
      )}
      <DataTable
        value={deliveryBoysList}
        header={header}
        // footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column
          header="avatar"
          body={(boy) => (
            <Avatar
              size="large"
              image={`/images/delivery-boys-avatars/${boy.avatar}`}
              shape="circle"
            />
          )}
        ></Column>
        <Column field="phone" header="Phone Number"></Column>
          {/* <Column
            field="orderCount"
            body={(boy) => <span>{`${boy.orderCount} Orders`}</span>}
            header="Orders Delivered"
          /> */}
        <Column
          field="profiteForEveryDelivery"
          body={(boy) => <span>{`${boy.profiteForEveryDelivery} DA`}</span>}
          header="Profite / Delivery"
        ></Column>
        <Column
          field="profiteForEveryDelivery"
          body={(boy) => <span>{`${boy.unpaid} DA`}</span>}
          header="Unpaid Amount"
        ></Column>
        <Column
          body={(boy) => (
            <Button
              disabled={boy.unpaid == 0}
              style={{ cursor: boy.unpaid == 0 ? "not-allowed" : "pointer" }}
              onClick={() => {
                setSelectedBoy(boy);
                setVisible(true);
              }}
              label="Submit"
            />
          )}
          header="Add Payment"
        ></Column>
      </DataTable>
    </>
  );
};

export default WorkersPayments;
