import { Dialog } from "primereact/dialog";

import { Divider } from "primereact/divider";

const OrderInfoDialog = ({
  showOrderInfoDialogVisibility,
  setShowOrderInfoDialogVisibility,
  currentShowOrderData,
}) => {
  return (
    <Dialog
      header="Order Info"
      visible={showOrderInfoDialogVisibility}
      style={{ width: "50vw" }}
      onHide={() => setShowOrderInfoDialogVisibility(false)}
    >
      <div>
        <div className="">
          <p>
            <span className="font-bold">Phone Number:</span>{" "}
            {currentShowOrderData.phoneNumber}
          </p>
          <Divider />

          <p>
            <span className="font-bold">Customer Name:</span>{" "}
            {currentShowOrderData.customerName}
          </p>
          <Divider />

          <p>
            <span className="font-bold">Money:</span>{" "}
            {currentShowOrderData.money + " " + "DA"}
          </p>
          <Divider />

          <p>
            <span className="font-bold">PickUp Location:</span>{" "}
            {currentShowOrderData.pickUpLocation}
          </p>
          <Divider />

          <p>
            <span className="font-bold">Delivery Location:</span>{" "}
            {currentShowOrderData.deliveryLocation}
          </p>
          <Divider />

          <div>
            <span className="font-bold block">More Info:</span>
            <pre className="ml-2">
              {currentShowOrderData.moreInfo
                ? currentShowOrderData.moreInfo
                : "none"}
            </pre>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderInfoDialog;
