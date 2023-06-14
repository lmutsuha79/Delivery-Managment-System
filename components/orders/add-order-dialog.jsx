import { error_toast } from "@/lib/toast-notifications";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/InputTextarea";
import { useState } from "react";

const AddOrderDialog = ({
  addOrderDialogVisibility,
  setAddOrderDialogVisibility,
}) => {
  function submitAddNewOrder() {
    const form = document.getElementById("add_new_order_form");
    //     check the validity of the form
    if (!form.checkValidity()) {
      const invalidFields = Array.from(form.elements)
        .filter((element) => !element.validity.valid)
        .forEach((element) =>
          error_toast(`${element.name} is not valid`, "top-right")
        );
    }
  }

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => setAddOrderDialogVisibility(false)}
        className="p-button-text"
      />
      <Button
        label="Confirm"
        icon="pi pi-check"
        onClick={() => submitAddNewOrder()}
        autoFocus
      />
    </div>
  );

  const [formData, setFormData] = useState({
    phoneNumber: "",
    customerName: "",
    moreInfo: "",
    pickUpLocation: "",
    deliveryLocation: "",
    money: 0,
    deliveryBoy: "",
  });
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
  const deliveryBoys = [
    { name: "Zino Bouabdalah", image: "zino.jpg" },
    { name: "yasser Doe", image: "yasser.png" },
    { name: "sarim Smith", image: "sarim.jpg" },
    // Add more delivery boy objects as needed
  ];
  const handleDeliveryBoyChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryBoy: e.target.value,
    }));
  };

  return (
    <Dialog
      visible={addOrderDialogVisibility}
      style={{ width: "50vw" }}
      onHide={() => setAddOrderDialogVisibility(false)}
      header={<div>Add New Customer Order</div>}
      footer={footerContent}
    >
      <div className="p-fluid">
        <form id="add_new_order_form" onSubmit={handleSubmit}>
          {/* Repeat the pattern for other form fields */}
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
              id="deliveryBoy"
              name="deliveryBoy"
              value={formData.deliveryBoy}
              options={deliveryBoys}
              onChange={handleDeliveryBoyChange}
              optionLabel="name"
              filter
              showClear
              placeholder="Select a delivery boy"
              className="p-dropdown"
              required
            >
              <template slot="item" slot-scope="option">
                <div className="p-d-flex p-ai-center">
                  {/* <img
                    src={`/images/delivery-boys-avatars/${deliveryBoys.image}`}
                    alt={deliveryBoys.name}
                    className="delivery-boy-image"
                  /> */}
                  <span className="p-ml-2">{deliveryBoys.name}</span>
                </div>
              </template>
            </Dropdown>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddOrderDialog;
