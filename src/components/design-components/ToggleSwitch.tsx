import React, { useState } from "react";

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onToggle }) => {
  return (
    <div
      className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer ${
        isChecked ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={() => onToggle(!isChecked)}
    >
      <span
        className={`absolute left-0 inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform ${
          isChecked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
