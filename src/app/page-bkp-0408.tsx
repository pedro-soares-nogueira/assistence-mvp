"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Image as PImage, CheckCircle } from "phosphor-react";
import Link from "next/link";
import main_logo from "@/assets/logo.svg";
import Image from "next/image";
import main_hero from "@/assets/main_hero.png";
import main_hero_mob from "@/assets/main_hero_mob.svg";
import { BounceLoader } from "react-spinners";
import * as Select from "@radix-ui/react-select";

export interface IPartiner {
  properties: {
    Name: { id: string; type: string; title: { plain_text: string }[] };
    Avatar: {
      id: string;
      type: string;
      files: {
        name: string;
        type: string;
        file: {
          url: string;
          expiry_time: string;
        };
      }[];
    };
    Details: {
      id: string;
      type: string;
      rich_text: {
        plain_text: string;
      }[];
    };
    Facebook: { id: string; type: string; url: string };
    Instagram: { id: string; type: string; url: string };
    Whatsapp: { id: string; number: number };
    Specialty: {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    Tags: {
      id: string;
      type: string;
      multi_select: {
        id: string;
        name: string;
        color: string;
      }[];
    };
    Valor_social: {
      id: string;
      checkbox: boolean;
    };
    Gratuitas: {
      id: string;
      checkbox: boolean;
    };
    Grat_quantity: {
      id: string;
      number: number;
    };
    Disasters: {
      id: string;
      checkbox: boolean;
    };
    Slug: { rich_text: { text: { content: string } }[] };
    CRP: { rich_text: { text: { content: string } }[] };
    CRM: { rich_text: { text: { content: string } }[] };
    Avatar_url: { url: string };
  };
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<IPartiner[]>([]);
  const [specialtyToFilter, setSpecialtyToFilter] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");

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

  function filterPartners(array: IPartiner[], specialty: string, name: string) {
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

  const filteredPartners = filterPartners(
    partners,
    specialtyToFilter,
    nameToFilter
  );

  const partnersToRender =
    filteredPartners.length === 0 ? partners : filteredPartners;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = partnersToRender.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    window.scrollTo({ top: 1300, behavior: "smooth" });
  };

  const totalPages = Math.ceil(partnersToRender.length / itemsPerPage);
  const maxPageButtons = 2;

  return (
    <main className="">
      <section className="text-gray-600 body-font">
        {/* Desktop */}
        <div
          className="hidden lg:block"
          style={{
            backgroundImage: `url('${main_hero.src}')`,
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
            backgroundColor: "#F1F1F1",
          }}
        >
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 py-8 justify-center items-center relative h-[33.5rem]">
            <div className="hidden lg:block" />
            <div className="w-full flex flex-col items-start justify-start gap-8">
              <a className="border border-[#e7e7e7] title-font font-medium items-center text-gray-900 hidden lg:flex">
                <Image
                  alt=""
                  src={main_logo}
                  className="max-w-[145px] w-full"
                />
              </a>
              <h1 className="title-font sm:text-4xl text-3xl font-bold text-gray-900 text-center lg:text-left">
                Portal de Saúde para a Comunidade LGBT+
              </h1>
              <p className="leading-relaxed text-sm  text-center lg:text-left">
                Somos um portal que visa conectar a comunidade LGBT+ a uma lista
                de profissionais de saúde comprometidos em fornecer atendimento
                de baixo custo e seguro para todos. <br />
                <br /> Atuamos como uma plataforma de conexão entre membros da
                comunidade e profissionais de saúde que demonstram compreensão e
                sensibilidade em relação às questões de diversidade sexual e de
                gênero.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="block lg:hidden bg-[#F1F1F1]">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 pt-8 justify-center items-center relative">
            <div className="hidden lg:block" />
            <div className="w-full flex flex-col items-start justify-start gap-8">
              <h1 className="title-font sm:text-4xl text-3xl font-bold text-gray-900 text-center lg:text-left">
                Portal de Saúde para a Comunidade LGBT+
              </h1>
              <p className="leading-relaxed text-sm  text-center lg:text-left">
                Somos um portal que visa conectar a comunidade LGBT+ a uma lista
                de profissionais de saúde comprometidos em fornecer atendimento
                de baixo custo e seguro para todos. <br /> <br />
                Atuamos como uma plataforma de conexão entre membros da
                comunidade e profissionais de saúde que demonstram compreensão e
                sensibilidade em relação às questões de diversidade sexual e de
                gênero.
              </p>
              <div className="h-[405px] object-cover mx-auto">
                <Image alt="" src={main_hero_mob} className="w-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto mt-20">
          <div className="flex flex-col text-center w-full mb-14">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
              Time de parceiros
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-sm">
              Escolha o profissional de saúde que melhor atenda às suas
              necessidades. Depois, entre em contato diretamente pelo WhatsApp
              ou redes sociais listadas em seus perfis. <br />
              Estamos aqui para facilitar sua busca por cuidados de saúde
              acessíveis e seguros. Não hesite em dar o primeiro passo em
              direção ao cuidado que você merece.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Buscar por nome"
              value={nameToFilter}
              onChange={(e) => setNameToFilter(e.target.value)}
              className="border border-gray-300 rounded-md py-3 px-4 text-sm w-full"
            />

            <Select.Root
              value={specialtyToFilter}
              onValueChange={setSpecialtyToFilter}
            >
              <Select.Trigger
                className="border border-gray-300 rounded-md py-3 px-4 flex items-center 
                        justify-between gap-5 text-sm  w-full"
              >
                <Select.Value placeholder="Selecione uma especialidade" />
                <Select.Icon className="" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white px-4 py-2 drop-shadow-lg rounded-md">
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

            <button
              onClick={() => {
                setSpecialtyToFilter("");
                setNameToFilter("");
              }}
              className="float-end sm:float-none py-3 px-4 rounded-md border-gray-300"
            >
              Limpar
            </button>
          </div>

          <BounceLoader
            size={150}
            loading={isLoading}
            className="mx-auto mb-14"
            color="#e9d5ff"
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
                  className="space-y-4 border border-[#F5F5F5] p-5 rounded-[2px]"
                >
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
                  <div className="flex items-center justify-start md:items-start md:justify-start flex-wrap gap-[10px]">
                    {partner.properties.Tags.multi_select.map((item) => (
                      <p
                        key={item.id}
                        className="text-gray-900 rounded-sm text-xs bg-gray-200 py-[2px] px-[6px]"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                  <div>
                    {partner.properties.Details.rich_text && (
                      <span className="text-gray-900 rounded-sm text-[13px] line-clamp-4 overflow-hidden text-ellipsis">
                        {partner.properties.Details.rich_text[0].plain_text}
                      </span>
                    )}
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

            {/* Number Buttons */}
            {/* {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
              const pageNumber = startPage + index;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 text-sm font-medium ${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded hover:bg-blue-400`}
                >
                  {pageNumber}
                </button>
              );
            })} */}

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
    </main>
  );
}
