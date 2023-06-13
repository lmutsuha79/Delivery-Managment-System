import { useEffect, useState } from "react";

const ToggleButton = ({
  currentSession,
  boyId,
  handleSetAbsent,
  handleSetPresent,
}) => {
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    async function getAttandanceStatus() {
      try {
        const response = await fetch(`/api/attendance/get-status`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: currentSession.sessionId,
            deliveryBoyId: boyId,
          }),
        });
        const data = await response.json();

        // Update the attendance status state
        setIsOn(data.status);
      } catch (error) {
        console.error(error);
      }
    }

    getAttandanceStatus();
  });

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
    !isOn ? handleSetPresent(boyId) : handleSetAbsent(boyId);
  };

  return (
    <div
      className={`flex items-center w-16 h-8 rounded-full cursor-pointer ${
        isOn ? "bg-green-500" : "bg-red-500"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform ${
          isOn ? "translate-x-8" : "translate-x-0"
        } transition-transform`}
      ></div>
      <span
        className={`ml-2 text-sm font-semibold ${
          isOn ? "text-green-500" : "text-white"
        } ${isOn ? "-translate-x-2" : "translate-x-0"} transition-transform`}
      >
        {isOn ? "ON" : "OFF"}
      </span>
    </div>
  );
  ب;
};

export default ToggleButton;
