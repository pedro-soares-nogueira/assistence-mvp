import { Specialty } from "@/interfaces";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactSelect from "react-select";

interface SpecialtyProps {
  setSelectedSpecialtyValue: Dispatch<
    SetStateAction<string | null | undefined>
  >;
  previousSpecialty: string;
  selectedSpecialtyValue: string | null | undefined;
}

const SelectSpecialyties = ({
  setSelectedSpecialtyValue,
  previousSpecialty,
  selectedSpecialtyValue,
}: SpecialtyProps) => {
  const id = Date.now().toString();
  const [specialties, setSpecialties] = useState<Specialty[]>();

  const [isMounted, setIsMounted] = useState(false);

  const fetchSpecialties = async () => {
    try {
      const response = await fetch(
        "https://api-pridecare.com/api/get_specialties.php"
      );
      const data = await response.json();

      setSpecialties(data.specialties);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    setIsMounted(true);
    setSelectedSpecialtyValue(previousSpecialty);
  }, []);

  const specialtiesToSelect = specialties?.map((specialty: any) => ({
    value: specialty.id,
    label: specialty.name,
    color: specialty.color,
  }));

  return (
    <>
      {isMounted && (
        <div className="mb-6">
          <label htmlFor="">Selecione sua especialidade*</label>
          <ReactSelect
            id={id}
            classNamePrefix="select"
            isSearchable={true}
            options={specialtiesToSelect}
            value={specialtiesToSelect?.find(
              (specialty) => specialty.value === selectedSpecialtyValue
            )}
            onChange={(event) => setSelectedSpecialtyValue(event?.value)}
          />
          <small className="text-xs text-gray-800">
            Começe a digitar para pesquisar
          </small>
        </div>
      )}
    </>
  );
};

export default SelectSpecialyties;
