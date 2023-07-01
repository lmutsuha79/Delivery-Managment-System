import {
  error_toast,
  info_toast,
  sucess_toast,
} from "@/lib/toast-notifications";
import { SessionContext } from "@/pages/_app";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

const SessionStatus = () => {
  const { currentSession, setCurrentSession } = useContext(SessionContext);
  const [confirmationDialogStatus, setConfirmationDialogStatus] =
    useState(false);
  const router = useRouter();

  async function handleStartSession() {
    try {
      const response = await fetch("/api/create-session", { method: "POST" });

      if (response.ok) {
        const data = await response.json();
        console.log("New session ID:", data.sessionId);
        setCurrentSession({ status: true, sessionId: data.sessionId });
        sucess_toast("a new session was created");
        info_toast(
          "you can now start receiving orders and mark the delivery boys attandance"
        );
        // Handle the response data or perform any other actions
      } else {
        const errorData = await response.json();
        console.error("Failed to start a new session:", errorData.error);
        error_toast("Failed to start a new session:" + errorData.error);

        // Handle the error or display an error message
      }
    } catch (error) {
      console.error("Failed to start a new session:", error);
      error_toast("Failed to start a new session:" + error);

      // Handle the error or display an error message
    }
  }
  async function handleStopSession() {
    try {
      const response = await fetch("/api/stop-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: currentSession.sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentSession({ sessionId: null, status: false });
        console.log("Stopped session ID:", data.sessionId);
        sucess_toast("the Session was successfully stopped");
        // Handle the response data or perform any other actions
      } else {
        const errorData = await response.json();
        console.error("Failed to stop the session:", errorData.error);
        error_toast("Failed to stop the session:" + errorData.error);
        // Handle the error or display an error message
      }
    } catch (error) {
      console.error("Failed to stop the session:", error);

      // Handle the error or display an error message
    }
  }

  return (
    <>
      <Dialog
        header={<div>Warning!</div>}
        visible={confirmationDialogStatus}
        style={{ width: "50vw" }}
        onHide={() => setConfirmationDialogStatus(false)}
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setConfirmationDialogStatus(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => {
                handleStopSession();
                setConfirmationDialogStatus(false);
                router.push("/all-orders");
              }}
              autoFocus
            />
          </div>
        }
      >
        <p className="m-0">
          are you sur that you want to close the current session?
        </p>
      </Dialog>
      <div className="flex gap-2 items-center">
        {!currentSession.status ? (
          <>
            <p className="text-lg font-medium text-green-500 m-0">
              Start New Session
            </p>
            <button onClick={handleStartSession}>
              <FontAwesomeIcon
                className="text-green-500 border-2 border-green-500 rounded-md p-2 hover:bg-green-600 hover:text-white cursor-pointer transition-colors"
                icon={faPlay}
              />
            </button>
          </>
        ) : (
          <>
            <p className="text-lg font-medium text-red-500 m-0">
              Stop This Session
            </p>
            <button onClick={() => setConfirmationDialogStatus(true)}>
              <FontAwesomeIcon
                className="text-red-500 border-2 border-red-500 rounded-md p-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors"
                icon={faStop}
              />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SessionStatus;
