import { fetchDeliveryBoys } from "@/lib/fetch-delivery-boys";
import { error_toast, sucess_toast } from "@/lib/toast-notifications";
import { SessionContext } from "@/pages/_app";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/InputTextarea";
import { useContext, useEffect, useState } from "react";

const EdditOrderDialog = ({
  changeOrdersToken,
  edditOrderDialogStatus,
  setEdditOrderDialogStatus,
  currentEditbleOrderData,
}) => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    customerName: "",
    moreInfo: "",
    pickUpLocation: "",
    deliveryLocation: "",
    money: 0,
    deliveryBoy: null,
  });

  useEffect(() => {
    console.log(currentEditbleOrderData);
    setFormData({ ...currentEditbleOrderData });
  }, [currentEditbleOrderData]);

  const [deliveryBoysList, setDeliveryBoysList] = useState([]);
  useEffect(() => {
    async function setBoys() {
      const boys = await fetchDeliveryBoys();
      setDeliveryBoysList(boys);
    }
    setBoys();
  }, []);

  async function submitEditOrderInfo() {
    console.log(formData);
    const form = document.getElementById("add_new_order_form");
    //     check the validity of the form
    if (!form.checkValidity()) {
      const invalidFields = Array.from(form.elements)
        .filter((element) => !element.validity.valid)
        .forEach((element) =>
          error_toast(`${element.name} is not valid`, "top-right")
        );
    }
    try {
      const response = await fetch("/api/orders/update-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sessionId: currentSession.sessionId,
          deliveryBoyId: formData.deliveryBoy.id,
          status: formData.status.name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sucess_toast("the order was updated successfully id=" + data.order.id);
        changeOrdersToken();
        setEdditOrderDialogStatus(false);
        return data.order;
      } else {
        error_toast("Failed to update order");
        throw new Error("Failed to update order");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update order");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Perform submit logic, e.g., send the data to the server
    console.log(formData);
  };

  return (
    <Dialog
      visible={edditOrderDialogStatus}
      style={{ width: "50vw" }}
      onHide={() => setEdditOrderDialogStatus(false)}
      header={<div>Edit order info</div>}
      footer={
        <div>
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={() => setEdditOrderDialogStatus(false)}
            className="p-button-text"
          />
          <Button
            label="Confirm"
            icon="pi pi-check"
            onClick={() => submitEditOrderInfo()}
            autoFocus
          />
        </div>
      }
    >
      <div className="p-fluid">
        <form id="add_new_order_form" onSubmit={handleSubmit}>
          {/* Repeat the pattern for other form fields */}
          <div className="p-field">
            <label htmlFor="deliveryBoy" className="p-d-block">
              Order Status
            </label>

            <Dropdown
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              options={[
                { name: "pending" },
                { name: "on_the_road" },
                { name: "picked_up" },
                { name: "delivered" },
                { name: "canceled" },
              ]}
              optionLabel="name"
              placeholder="Order Status"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-field">
            <label htmlFor="phoneNumber" className="p-d-block">
              Phone Number:
            </label>
            <InputText
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="customerName" className="p-d-block">
              Customer Name:
            </label>
            <InputText
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="p-field">
            <label htmlFor="pickUpLocation" className="p-d-block">
              Pick-up Location:
            </label>
            <InputText
              id="pickUpLocation"
              name="pickUpLocation"
              value={formData.pickUpLocation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="deliveryLocation" className="p-d-block">
              Delivery Location:
            </label>
            <InputText
              id="deliveryLocation"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="money" className="p-d-block">
              Money:
            </label>
            <InputText
              id="money"
              name="money"
              type="number"
              value={formData.money}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="p-field">
            <label htmlFor="moreInfo" className="p-d-block">
              More Info:
            </label>
            <InputTextarea
              id="moreInfo"
              name="moreInfo"
              value={formData.moreInfo}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="p-field">
            <label htmlFor="deliveryBoy" className="p-d-block">
              Delivery Boy:
            </label>
            <Dropdown
              value={formData.deliveryBoy}
              onChange={(e) =>
                setFormData({ ...formData, deliveryBoy: e.value })
              }
              options={deliveryBoysList}
              optionLabel="name"
              placeholder="Select a delivery boy"
              className="w-full md:w-14rem"
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EdditOrderDialog;
