import React from "react";

interface NameSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NameSearchInput: React.FC<NameSearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nome"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="border border-gray-300 rounded-[2px] py-3 px-4 text-sm w-full md:col-span-3"
    />
  );
};

export default NameSearchInput;
