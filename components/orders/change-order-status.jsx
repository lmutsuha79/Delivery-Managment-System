import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const ChangeOrderStatus = ({
  changeStatusDialogVisibility,
  setChangeStatusDialogVisibility,
}) => {
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setChangeStatusDialogVisibility(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setChangeStatusDialogVisibility(false)}
        autoFocus
      />
    </div>
  );
  return (
    <Dialog
      header="Change Order Status"
      visible={changeStatusDialogVisibility}
      style={{ width: "50vw" }}
      onHide={() => setChangeStatusDialogVisibility(false)}
      footer={footerContent}
    >
      <div>
        <h3>Change Order Status to:</h3>
        <div>
            <Button>Pending</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangeOrderStatus;
