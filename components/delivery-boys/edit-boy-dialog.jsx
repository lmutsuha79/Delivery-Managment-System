import { error_toast, sucess_toast } from "@/lib/toast-notifications";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const EditBoyDialog = ({
  setEditBoyDialog,
  editBoyDialog,
  currentEditableBoyInfo,
  // setCurrentEditableBoyInfo,
}) => {
  const [deliveryBoyInfo, setDeliveryBoyInfo] = useState();

  useEffect(() => {
    setDeliveryBoyInfo(currentEditableBoyInfo);
  }, [currentEditableBoyInfo]);

  async function handleDeleteBoy() {
    console.log(currentEditableBoyInfo.id);
    try {
      const response = await fetch("/api/delete-delivery-boy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentEditableBoyInfo.id }),
      });

      if (response.ok) {
        console.log("Item deleted successfully");
        sucess_toast("Delivery boy deleted successfully");
        setEditBoyDialog(false);
        // Perform any additional actions after deletion
      } else {
        console.error("Error deleting item:", response.statusText);
        // Handle error case
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      error_toast("error deleting delivery boy" + error);
      // Handle error case
    }
  }

  async function handleUpdateBoyInfo() {
    try {
      const response = await fetch("/api/update-delivery-boy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentEditableBoyInfo.id,
          name: deliveryBoyInfo.name,
          phone: deliveryBoyInfo.phone,
          avatar: deliveryBoyInfo.avatar,
          profiteForEveryDelivery: deliveryBoyInfo.profiteForEveryDelivery,
        }),
      });

      if (response.ok) {
        sucess_toast("Delivery boy info updated successfully");
        setEditBoyDialog(false);
        // Perform any additional actions after deletion
      } else {
        console.error("Error updating delivery boy:", response.statusText);
        throw new Error("Error updating delivery boy");
        // Handle error case
      }
    } catch (error) {
      console.error("Error updating delivery boy:", error);
      error_toast("error updating delivery boy info" + error);
      // Handle error case
    }
  }

  return (
    <Dialog
      header={<h3>Edit Delivery Boy</h3>}
      footer={
        <div>
          <Button
            onClick={handleDeleteBoy}
            className="gap-2"
            icon="pi pi-trash"
            severity="danger"
          >
            Delete
          </Button>
          <Button
            onClick={handleUpdateBoyInfo}
            className="gap-2"
            icon="pi pi-check-circle"
            severity="primary"
          >
            Submit changes
          </Button>
        </div>
      }
      visible={editBoyDialog}
      style={{ width: "50vw" }}
      onHide={() => setEditBoyDialog(false)}
    >
      <form className="flex flex-col  gap-5 justify-center items-center mt-4">
        <div>
          <span className="p-float-label">
            <InputText
              id="name"
              value={deliveryBoyInfo?.name}
              onChange={(e) =>
                setDeliveryBoyInfo({
                  ...deliveryBoyInfo,
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
              value={deliveryBoyInfo?.phone}
              onChange={(e) =>
                setDeliveryBoyInfo({
                  ...deliveryBoyInfo,
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
              value={deliveryBoyInfo?.avatar}
              onChange={(e) =>
                setDeliveryBoyInfo({
                  ...deliveryBoyInfo,
                  avatar: e.target.value,
                })
              }
            />
            <label htmlFor="avatar">Image Name ('yasser.png')</label>
          </span>
        </div>
        <div>
          <span className="p-float-label">
            <InputText
              type="number"
              id="profiteForEveryDelivery"
              value={deliveryBoyInfo?.profiteForEveryDelivery}
              onChange={(e) =>
                setDeliveryBoyInfo({
                  ...deliveryBoyInfo,
                  profiteForEveryDelivery: e.target.value,
                })
              }
            />
            <label htmlFor="profiteForEveryDelivery">
              Profite For Every Delivery (Da)
            </label>
          </span>
        </div>
      </form>
    </Dialog>
  );
};

export default EditBoyDialog;
