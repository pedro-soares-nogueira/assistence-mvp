"use client";

import React, { useEffect, useState } from "react";
import { Image as PImage, CheckCircle } from "phosphor-react";
import Link from "next/link";
import { BounceLoader } from "react-spinners";
import * as Select from "@radix-ui/react-select";
import { IPartner } from "@/interfaces";

const TestingHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<IPartner[]>([]);
  const [specialtyToFilter, setSpecialtyToFilter] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const specialtiesToFilter = partners.reduce(
    (accumulator: string[], currentValue) => {
      const specialtyName = currentValue.properties.Specialty.select.name;

      if (!accumulator.includes(specialtyName)) {
        accumulator.push(specialtyName);
      }

      return accumulator;
    },
    []
  );

  useEffect(() => {
    fetch("api/get-partners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter os partners.");
        }
        return response.json();
      })
      .then((data) => {
        setPartners(data.partners);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao obter os partners:", error);
      });
  }, []);

  function filterPartners(array: IPartner[], specialty: string, name: string) {
    const searchTermLowerCase = name.toLowerCase();
    const specialtyTermLowerCase = specialty.toLowerCase();

    return array.filter((item) => {
      const specialtyMatch = item.properties.Specialty.select.name
        .toLowerCase()
        .includes(specialtyTermLowerCase);
      const nameMatch = item.properties.Name.title[0].plain_text
        .toLowerCase()
        .includes(searchTermLowerCase);
      return specialtyMatch && nameMatch;
    });
  }

  const filteredPartners = searchTriggered
    ? filterPartners(partners, specialtyToFilter, nameToFilter)
    : partners;

  const partnersToRender = filteredPartners;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = partnersToRender.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSearch = () => {
    setSearchTriggered(true);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(partnersToRender.length / itemsPerPage);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section
        className="relative overflow-hidden bg-gradient-to-b from-[#222C60] to-[#1B1E27] 
                          min-h-[28rem] flex items-center justify-center text-center"
      >
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
            <input
              type="text"
              placeholder="Buscar por nome"
              value={nameToFilter}
              onChange={(e) => setNameToFilter(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border border-gray-300 rounded-[2px] py-3 px-4 text-sm w-full md:col-span-3"
            />

            <Select.Root
              value={specialtyToFilter}
              onValueChange={setSpecialtyToFilter}
            >
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
                    {specialtiesToFilter.length !== 0 &&
                      specialtiesToFilter.map((item) => {
                        return (
                          <Select.Item
                            value={item}
                            key={item}
                            className="flex items-center justify-between h-10 text-gray-600"
                          >
                            <Select.ItemText className="">
                              <p className="">{item}</p>
                            </Select.ItemText>
                            <Select.ItemIndicator className="">
                              <CheckCircle size={20} />
                            </Select.ItemIndicator>
                          </Select.Item>
                        );
                      })}
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                  <Select.Arrow />
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <div className="flex gap-2 flex-col sm:flex-row md:col-span-6 lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full py-[8px] px-4 rounded-[2px] border border-white text-white "
              >
                Buscar
              </button>

              <button
                onClick={() => {
                  setSpecialtyToFilter("");
                  setNameToFilter("");
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
            {currentPartners.map((partner, index) => {
              const slugToPartnerPage =
                partner.properties.Slug.rich_text.length !== 0
                  ? partner.properties.Slug.rich_text[0].text.content
                  : "";
              const url = partner.properties.Avatar_url.url;
              return (
                <div
                  key={index}
                  className="border border-[#F5F5F5] p-5 rounded-[2px] flex flex-col justify-between gap-4"
                >
                  <div className="space-y-4 ">
                    <div className="flex">
                      {url !== null ? (
                        <img
                          alt="team"
                          className="w-16 h-16 bg-gray-100 object-cover object-center rounded-[5px] mr-4"
                          src={url}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
                          <PImage size={22} />
                        </div>
                      )}
                      <div>
                        <h2 className="text-gray-900 title-font font-semibold text-md">
                          {partner.properties.Name.title[0].plain_text}
                        </h2>
                        <p className={`text-gray-500 text-xs`}>
                          {partner.properties.Specialty.select.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-start md:items-start md:justify-start flex-wrap gap-[10px] md:min-h-[50px]">
                      {partner.properties.Tags.multi_select
                        .slice(0, 3)
                        .map((item) => (
                          <p
                            key={item.id}
                            className="text-gray-900 rounded-sm text-xs bg-gray-200 py-[2px] px-[6px]"
                          >
                            {item.name}
                          </p>
                        ))}
                      {partner.properties.Tags.multi_select.length > 3 && (
                        <p className="rounded-sm text-xs bg-pink-200 py-[2px] px-[6px]">
                          +{partner.properties.Tags.multi_select.length - 3}{" "}
                        </p>
                      )}
                    </div>

                    <div>
                      {partner.properties.Details.rich_text && (
                        <span className="text-gray-900 rounded-sm text-[13px] line-clamp-4 overflow-hidden text-ellipsis">
                          {partner.properties.Details.rich_text[0].plain_text}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/partners/${slugToPartnerPage}`}
                    className="flex items-center justify-center text-center bg-[#222C60] font-bold text-white rounded-[2px] py-[10px] text-xs"
                  >
                    Ver perfil completo
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 h-[36px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 h-[36px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 h-[36px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 h-[36px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestingHome;
