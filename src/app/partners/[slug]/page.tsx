"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
  ArrowLeft,
  ShareNetwork,
  CheckCircle,
} from "phosphor-react";
import { usePathname } from "next/navigation";
import { RWebShare } from "react-web-share";
import { IPartner } from "@/interfaces";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import WhatsappButton from "@/components/WhatsappButton";
import { SessionProvider } from "next-auth/react";
import SocialLinksButton from "@/components/SocialLinksButton";
import toast, { Toaster } from "react-hot-toast";

const PartinerPage = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<IPartner[]>([]);

  const pathname = usePathname();

  const communBasePath = "/partners/";
  const partnerToShare = pathname.replace(communBasePath, "");

  useEffect(() => {
    fetch("../api/get-partners")
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

  const partnerToShow = partners.find(
    (item) =>
      item.properties.Slug.rich_text.length !== 0 &&
      (item.properties.Slug.rich_text[0].text.content === params.slug ||
        params.slug === "")
  );

  const partnerNumberFormatted = `55${partnerToShow?.properties.Whatsapp.number}`;

  const messageToSend = encodeURIComponent(
    "Olá, estou vindo da Pride Care. Gostaria de mais detalhes do atendimento, pode me ajudar?"
  );

  const linkWhatsApp = `https://wa.me/${partnerNumberFormatted}?text=${messageToSend}`;

  // useEffect(() => {
  //   const toastId = toast.custom(
  //     (t) => (
  //       <div
  //         className={`${
  //           t.visible ? "animate-enter" : "animate-leave"
  //         } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //       >
  //         <div className="flex-1 w-0 p-4">Parece que você não está logado</div>
  //         <div className="flex border-l border-gray-200">
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center
  //           justify-center text-lg font-medium text-indigo-600 hover:text-indigo-500
  //           focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //           >
  //             x
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { duration: 8000 }
  //   );

  //   return () => {
  //     toast.dismiss(toastId);
  //   };
  // }, []);

  return (
    <div className="relative">
      <Toaster position="top-right" />

      <div className="absolute top-0 inset-x-0 w-full flex items-center justify-between">
        <div className="bg-[#7E34D9] max-w-[900px] w-full min-h-[8px]" />
        <div className="bg-[#0074A6] max-w-[900px] w-full min-h-[8px]" />
        <div className="bg-[#79A06E] max-w-[900px] w-full min-h-[8px]" />
        <div className="bg-[#FFB101] max-w-[900px] w-full min-h-[8px]" />
        <div className="bg-[#FF6001] max-w-[900px] w-full min-h-[8px]" />
        <div className="bg-[#CF1616] max-w-[900px] w-full min-h-[8px]" />
      </div>
      <div className="bg-gradient-to-b from-[#222C60] to-[#1B1E27] min-h-[28rem] absolute top-0 inset-x-0 -z-[9999]"></div>

      <div className="container mx-auto px-4">
        <div className="pt-8 pb-5 mb-10 border-b border-white flex items-center justify-between gap-4 flex-row">
          <button
            onClick={() => history.back()}
            className="flex gap-3 font-semibold text-gray-100"
          >
            <ArrowLeft size={20} weight="bold" className="mt-[2px]" />
            Voltar
          </button>

          <RWebShare
            data={{
              title: "",
              text: "Pride Care - Portal de Saúde para a Comunidade LGBT+: Conheça nosso parceiro:",
              url: `${partnerToShare}`,
            }}
          >
            <button
              className="bg-transparent text-[#1E1E1E] p-[10px] rounded-[2px] 
                            hover:opacity-80 focus:outline-none flex items-center justify-center gap-2 text-sm"
            >
              <ShareNetwork size={18} weight="duotone" color="white" />
              <span className="text-white hidden md:block">Compartilhar</span>
            </button>
          </RWebShare>
        </div>

        {partnerToShow !== undefined && (
          <div className="bg-white w-full rounded-[10px] p-5 md:p-24">
            <div className="flex flex-col md:flex-row gap-[10px] items-center md:items-start md:gap-6">
              {partnerToShow.properties.Avatar_url.url !== null && (
                <Image
                  alt=""
                  src={partnerToShow.properties.Avatar_url.url}
                  width={200}
                  height={200}
                  className="max-w-[110px] max-h-[110px] w-full h-full md:max-w-[200px] md:max-h-[200px] object-cover rounded-[4px]"
                />
              )}

              <div className="space-y-1 text-center md:text-start">
                <p className="text-gray-900 text-xl font-bold md:text-3xl">
                  {partnerToShow?.properties.Name.title[0].plain_text}
                </p>

                <span className="block">
                  {partnerToShow?.properties.Specialty.select.name}
                </span>

                {partnerToShow?.properties.CRP.rich_text.length !== 0 && (
                  <span className="block font-bold">
                    CRP -{" "}
                    {partnerToShow?.properties.CRP.rich_text[0].text.content}
                  </span>
                )}

                {partnerToShow?.properties.CRM.rich_text.length !== 0 && (
                  <span className="block font-bold">
                    CRM -{" "}
                    {partnerToShow?.properties.CRM.rich_text[0].text.content}
                  </span>
                )}

                <div className="!mt-4 flex md:items-start md:justify-start gap-3 flex-col md:flex-row items-center justify-center">
                  {partnerToShow?.properties.Valor_social?.checkbox && (
                    <span className="bg-gray-200 flex py-1 px-2 rounded-[2px] text-[11px] md:text-xs gap-1">
                      <CheckCircle size={16} className="text-green-600" />
                      Vagas com preço social
                    </span>
                  )}

                  {partnerToShow.properties.Grat_quantity?.number !== null && (
                    <span className="bg-gray-200 flex py-1 px-2 rounded-[2px] text-[11px] md:text-xs gap-1">
                      <CheckCircle size={16} className="text-green-600" />
                      Vagas gratuitas - Total de{" "}
                      {partnerToShow.properties.Grat_quantity?.number === null
                        ? "0"
                        : partnerToShow.properties.Grat_quantity?.number}
                    </span>
                  )}
                </div>
                <SessionProvider>
                  <SocialLinksButton
                    partnerToShow={partnerToShow}
                    linkWhatsApp={linkWhatsApp}
                  />
                </SessionProvider>

                {/* <div className="flex items-center justify-center md:items-start md:justify-start gap-3 !mt-4 ">
                  {partnerToShow?.properties.Facebook.url && (
                    <a
                      href={partnerToShow?.properties.Facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#222C60] rounded-[4px] p-1"
                    >
                      <FacebookLogo size={22} className="text-white" />
                    </a>
                  )}
                  {partnerToShow?.properties.Instagram.url && (
                    <a
                      href={partnerToShow?.properties.Instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#222C60] rounded-[2px] p-1"
                    >
                      <InstagramLogo size={22} className="text-white" />
                    </a>
                  )}
                  {partnerToShow?.properties.Whatsapp.number && (
                    <a
                      href={linkWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#222C60] rounded-[2px] p-1"
                    >
                      <WhatsappLogo size={22} className="text-white" />
                    </a>
                  )}
                </div> */}
              </div>
            </div>

            <div className=" mt-7">
              <div className="flex items-center justify-center md:items-start md:justify-start flex-wrap gap-[10px]">
                {partnerToShow?.properties.Tags.multi_select.map((item) => {
                  return (
                    <p
                      key={item.id}
                      className="text-gray-900 rounded-sm text-xs bg-[#e6c7ff] py-1 px-2"
                    >
                      {item.name}
                    </p>
                  );
                })}
              </div>

              <p className="text-gray-500 text-sm block mt-8">
                {partnerToShow?.properties.Details.rich_text[0].plain_text}
              </p>

              {partnerToShow?.properties.Whatsapp.number && (
                <SessionProvider>
                  <WhatsappButton linkWhatsApp={linkWhatsApp} />
                </SessionProvider>
              )}
            </div>
          </div>
        )}
        {partnerToShow === undefined && (
          <div className="bg-white w-full rounded-[10px] p-5 md:p-24">
            <div className="h-[56vh] grid grid-cols-1 md:grid-cols-5">
              <div className="!w-[110px] h-[110px] md:!w-[200px] md:h-[200px] mx-auto md:mx-0 md:col-span-2 lg:col-span-1">
                <Skeleton className="!w-[110px] h-[110px] md:!w-[200px] md:h-[200px] mx-auto md:mx-0" />
              </div>
              <div className="md:col-span-2 mx-6 md:mx-0 mt-4 md:mt-0">
                <Skeleton className="h-[36px]" />
                <Skeleton className="h-[16px]" />
                <Skeleton className="h-[16px] !w-[80%]" />
                <Skeleton className="h-[16px] !w-[50%]" />
                <Skeleton className="h-[16px] !w-[30%]" />
                <div className="hidden md:flex items-center justify-start gap-4">
                  <Skeleton className="!w-[36px] h-[36px]" />
                  <Skeleton className="!w-[36px] h-[36px]" />
                </div>
              </div>
              <div className="md:col-span-2 md:hidden flex items-center justify-center gap-4">
                <Skeleton className="!w-[36px] h-[36px]" />
                <Skeleton className="!w-[36px] h-[36px]" />
              </div>
              <div className="md:col-span-5 mt-4 md:mt-0">
                <Skeleton className="h-[200px]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartinerPage;
