"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import NameSearchInput from "@/components/partner-search-page/SearchInput";
import SpecialtySelect from "@/components/partner-search-page/SpecialtySelect";
import PartnerCard from "@/components/partner-search-page/PartnerCard";
import Pagination from "@/components/partner-search-page/Pagination";
import { BounceLoader } from "react-spinners";
import { IPartner } from "@/interfaces";

const PartnerSearchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const specialtiesToFilter = useMemo(() => {
    return Array.from(
      new Set(partners.map((p) => p.properties.Specialty.select.name))
    );
  }, [partners]);

  useEffect(() => {
    fetch("api/get-partners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os parceiros.");
        }
        return response.json();
      })
      .then((data) => {
        setPartners(data.partners);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao obter os parceiros:", error);
      });
  }, []);

  const filterPartners = useCallback(
    (array: IPartner[], specialty: string, name: string) => {
      const lowerCaseName = name.toLowerCase();
      const lowerCaseSpecialty = specialty.toLowerCase();

      return array.filter((partner) => {
        const nameMatch = partner.properties.Name.title[0].plain_text
          .toLowerCase()
          .includes(lowerCaseName);

        const specialtyMatch = partner.properties.Specialty.select.name
          .toLowerCase()
          .includes(lowerCaseSpecialty);

        return nameMatch && specialtyMatch;
      });
    },
    []
  );

  const filteredPartners = useMemo(() => {
    return searchTriggered
      ? filterPartners(partners, specialtyFilter, nameFilter)
      : partners;
  }, [partners, specialtyFilter, nameFilter, searchTriggered, filterPartners]);

  const currentPartners = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPartners.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPartners, currentPage, itemsPerPage]);

  const handleSearch = () => {
    setSearchTriggered(true);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);

    if (window.innerWidth < 768) {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#222C60] to-[#1B1E27] min-h-[28rem] flex items-center justify-center text-center">
        <div className="md:max-w-[58rem] mx-auto px-4 space-y-12 w-full">
          <div className="space-y-2 text-sm">
            <div className="text-[#E6C7FF] uppercase text-base md:text-[20px]">
              Saúde LGBTI+
            </div>
            <h2 className="heading-bold font-semibold text-[34px] leading-[40px] sm:text-[38px] sm:leading-[46px] md:font-bold md:text-[48px] md:leading-[55px] mx-auto text-white">
              Busque profissionais inclusivos
            </h2>
          </div>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 gap-2">
            <NameSearchInput
              value={nameFilter}
              onChange={setNameFilter}
              onKeyDown={handleKeyDown}
            />
            <SpecialtySelect
              value={specialtyFilter}
              onValueChange={setSpecialtyFilter}
              specialties={specialtiesToFilter}
            />
            <div className="flex gap-2 flex-col sm:flex-row md:col-span-6 lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full py-[8px] px-4 rounded-[2px] border border-white text-white "
              >
                Buscar
              </button>
              <button
                onClick={() => {
                  setSpecialtyFilter("");
                  setNameFilter("");
                  setSearchTriggered(false);
                }}
                className="w-full py-[8px] px-4 rounded-[2px] text-white"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 w-full flex items-center justify-between">
          <div className="bg-[#7E34D9] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#0074A6] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#79A06E] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#FFB101] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#FF6001] max-w-[900px] w-full min-h-[8px]" />
          <div className="bg-[#CF1616] max-w-[900px] w-full min-h-[8px]" />
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="sm:container px-5 mx-auto mt-[2rem] md:mt-20">
          <BounceLoader
            size={150}
            loading={isLoading}
            className="mx-auto mb-14"
            color="#7E34D9"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentPartners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default PartnerSearchPage;
