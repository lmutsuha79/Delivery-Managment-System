import { useState } from "react";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
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
