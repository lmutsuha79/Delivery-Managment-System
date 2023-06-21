import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import NewBoyDialog from "@/components/delivery-boys/new-boy-dialog";
import EditBoyDialog from "@/components/delivery-boys/edit-boy-dialog";
import { fetchDeliveryBoys } from "@/lib/fetch-delivery-boys";

const DeliveryBoys = () => {
  const [boysListToken, setBoysListToken] = useState(0);
  function changeOrdersToken() {
    setBoysListToken((prev) => prev + 1);
  }
  // status of dialogs adding and edditing
  const [addNewBoyDialog, setAddNewBoyDialog] = useState(false);
  const [editBoyDialog, setEditBoyDialog] = useState(false);

  const [currentEditableBoyInfo, setCurrentEditableBoyInfo] = useState(null);

  const [deliveryBoysList, setDeliveryBoysList] = useState([]);

  useEffect(() => {
    fetchDeliveryBoys().then((boys) => setDeliveryBoysList(boys));
  }, [addNewBoyDialog, editBoyDialog, boysListToken]);

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
      {addNewBoyDialog && (
        <NewBoyDialog
          addNewBoyDialog={addNewBoyDialog}
          setAddNewBoyDialog={setAddNewBoyDialog}
        />
      )}
      {/* ########################################################## */}
      {editBoyDialog && (
        <EditBoyDialog
          editBoyDialog={editBoyDialog}
          setEditBoyDialog={setEditBoyDialog}
          currentEditableBoyInfo={currentEditableBoyInfo}
          setCurrentEditableBoyInfo={setCurrentEditableBoyInfo}
        />
      )}

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
        <Column field="phone" header="Phone Number"></Column>
        <Column field="profiteForEveryDelivery" body={boy => <span>{`${boy.profiteForEveryDelivery} DA`}</span>} header="Profite / Delivery"></Column>
        <Column
          field="eddit"
          header="Eddit"
          body={(target) => (
            <Button
              onClick={() => {
                setCurrentEditableBoyInfo(target);
                setEditBoyDialog(true);
              }}
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
