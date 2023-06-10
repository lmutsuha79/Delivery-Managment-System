import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import NewBoyDialog from "@/components/delivery-boys/new-boy-dialog";

const DeliveryBoys = () => {
  // status of dialogs adding and edditing
  const [addNewBoyDialog, setAddNewBoyDialog] = useState(false);
  const [edditNewBoyDialog, setEdditNewBoyDialog] = useState(false);

  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  function handleEdditDeliveryBoy(id) {
    console.log(id);
    setEdditNewBoyDialog(true);
  }

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const data = await fetch("/api/get-delivery-boys");
        const fetchedDeliveryBoys = await data.json();
        console.log(fetchedDeliveryBoys);
        setDeliveryBoysList(fetchedDeliveryBoys);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDeliveryBoys();
  }, [addNewBoyDialog, edditNewBoyDialog]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">List Of Deliver Boys</span>
      {/* <Button icon="pi pi-refresh" rounded raised /> */}
      <Button
        icon="pi pi-green pi-plus"
        rounded
        raised
        onClick={() => setAddNewBoyDialog(true)}
      >
        {" Add New"}
      </Button>
    </div>
  );
  const footer = `In total there are ${
    deliveryBoysList ? deliveryBoysList.length : 0
  } delivery boys.`;
  return (
    <div>
      <NewBoyDialog
        addNewBoyDialog={addNewBoyDialog}
        setAddNewBoyDialog={setAddNewBoyDialog}
      />
      {/* ########################################################## */}
      {/* <Dialog
        header={<h3>Eddit Delivery Boy</h3>}
        footer={
          <div>
            <Button className="gap-2" icon="pi pi-trash" severity="danger">
              Delete
            </Button>
            <Button
              className="gap-2"
              icon="pi pi-check-circle"
              severity="primary"
            >
              Submit changes
            </Button>
          </div>
        }
        visible={edditNewBoyDialog}
        style={{ width: "50vw" }}
        onHide={() => setEdditNewBoyDialog(false)}
      >
        <form className="flex flex-col  gap-5 justify-center items-center mt-4">
          <div>
            <span className="p-float-label">
              <InputText
                id="name"
                value={deliveryBoyInfo.name}
                onChange={(e) =>
                  SetDeliveryBoyInfo({
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
                value={deliveryBoyInfo.phone}
                onChange={(e) =>
                  SetDeliveryBoyInfo({
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
                value={deliveryBoyInfo.avatar}
                onChange={(e) =>
                  SetDeliveryBoyInfo({
                    ...deliveryBoyInfo,
                    avatar: e.target.value,
                  })
                }
              />
              <label htmlFor="avatar">Image Name ('yasser.png')</label>
            </span>
          </div>
        </form>
      </Dialog> */}

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
          field="eddit"
          header="Eddit"
          body={(target) => (
            <Button
              onClick={() => handleEdditDeliveryBoy(target.id)}
              size="small"
            >
              Eddit
            </Button>
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DeliveryBoys;
