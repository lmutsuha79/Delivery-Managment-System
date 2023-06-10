import { error_toast, sucess_toast } from "@/lib/toast-notifications";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const NewBoyDialog = ({ addNewBoyDialog, setAddNewBoyDialog }) => {
  const [newDeliveryBoyInfo, SetNewdeliveryBoyInfo] = useState({
    name: "",
    phone: "",
    avatar: "",
  });
  async function handleAddingNewDeliveryBoy() {
    try {
      const response = await fetch("/api/add-delivery-boy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newDeliveryBoyInfo.name,
          phone: newDeliveryBoyInfo.phone,
          avatar: newDeliveryBoyInfo.avatar,
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating user");
      }

      const newUser = await response.json();
      console.log(newUser);
      sucess_toast("new delivery boys sucessfully created");
      SetNewdeliveryBoyInfo({ name: "", phone: "", avatar: "" });
      setAddNewBoyDialog(false);

      // return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      error_toast(error.message);
      // Handle the error as needed
    }
  }

  return (
    <Dialog
      header={<h3>Add new Delivery Boy</h3>}
      footer={
        <Button
          onClick={handleAddingNewDeliveryBoy}
          className="gap-2"
          icon="pi pi-check-circle"
          severity="primary"
        >
          Confirme Adding
        </Button>
      }
      visible={addNewBoyDialog}
      style={{ width: "50vw" }}
      onHide={() => setAddNewBoyDialog(false)}
    >
      <form className="flex flex-col  gap-5 justify-center items-center mt-4">
        <div>
          <span className="p-float-label">
            <InputText
              id="name"
              value={newDeliveryBoyInfo.name}
              onChange={(e) =>
                SetNewdeliveryBoyInfo({
                  ...newDeliveryBoyInfo,
                  name: e.target.value,
                })
              }
            />
            <label htmlFor="name">Full Name</label>
          </span>
        </div>
        <div>
          <span className="p-float-label">
            <InputText
              id="phone"
              type="tel"
              value={newDeliveryBoyInfo.phone}
              onChange={(e) =>
                SetNewdeliveryBoyInfo({
                  ...newDeliveryBoyInfo,
                  phone: e.target.value,
                })
              }
            />
            <label htmlFor="phone">Phone Number</label>
          </span>
        </div>
        <div>
          <span className="p-float-label">
            <InputText
              id="avatar"
              value={newDeliveryBoyInfo.avatar}
              onChange={(e) =>
                SetNewdeliveryBoyInfo({
                  ...newDeliveryBoyInfo,
                  avatar: e.target.value,
                })
              }
            />
            <label htmlFor="avatar">Image Name ('yasser.png')</label>
          </span>
        </div>
      </form>
    </Dialog>
  );
};

export default NewBoyDialog;
