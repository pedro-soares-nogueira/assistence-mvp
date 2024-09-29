import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Select from "react-select";

interface City {
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
      };
    };
  };
}

interface CityProps {
  setSelectedCity: Dispatch<SetStateAction<string>>;
  inicialValue: string | null;
  selectedCity: string;
}

const CitySelector = ({
  setSelectedCity,
  inicialValue,
  selectedCity,
}: CityProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  const fetchFromIBGE = async () => {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar cidades");
    }
    const data = await response.json();
    setCities(data);
  };

  useEffect(() => {
    fetchFromIBGE();
    setIsMounted(true);
  }, []);

  const citiesToSelect = cities?.map((city: any) => ({
    value: city.id,
    label: `${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}`,
  }));

  if (error) {
    return <div>{error}</div>;
  }

  const foundCurrentCity = (citiesToSelect: any, current: any) => {
    return citiesToSelect.find((city: any) => city.value === current);
  };

  return (
    <>
      {isMounted && (
        <div className="mb-6">
          <label htmlFor="city-selector">Selecione sua cidade:</label>
          <Select
            id={id}
            value={
              selectedCity === ""
                ? citiesToSelect.find(
                    (city: any) => city.value === Number(inicialValue)
                  )
                : citiesToSelect.find(
                    (city: any) => city.value === Number(selectedCity)
                  )
            }
            classNamePrefix="select"
            isSearchable={true}
            options={citiesToSelect}
            onChange={(event: any) => setSelectedCity(event?.value)}
          />
          <small className="text-xs text-gray-800">
            Começe a digitar para pesquisar
          </small>
        </div>
      )}
    </>
  );
};

export default CitySelector;
