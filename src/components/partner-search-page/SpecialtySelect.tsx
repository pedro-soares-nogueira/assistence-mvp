import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckCircle } from "phosphor-react";

interface SpecialtySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  specialties: string[];
}

const SpecialtySelect: React.FC<SpecialtySelectProps> = ({
  value,
  onValueChange,
  specialties,
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className="border border-gray-300 rounded-[2px] py-3 px-4 flex items-center 
                    justify-between gap-5 text-sm w-full md:col-span-3 bg-white"
      >
        <Select.Value placeholder="Selecione uma especialidade" />
        <Select.Icon className="" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white px-4 py-2 drop-shadow-lg rounded-[2px]">
          <Select.ScrollUpButton />
          <Select.Viewport>
            {specialties.length !== 0 &&
              specialties.map((item) => (
                <Select.Item
                  value={item}
                  key={item}
                  className="flex items-center justify-between h-10 text-gray-600"
                >
                  <Select.ItemText>{item}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckCircle size={20} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SpecialtySelect;
