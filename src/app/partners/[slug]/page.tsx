"use client";

import Image from "next/image";
import Link from "next/link";
import main_logo from "@/assets/logo.svg";
import React, { useEffect, useState } from "react";
import { IPartiner } from "@/app/page";
import {
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
  Image as PImage,
  ArrowFatLeft,
} from "phosphor-react";
import { BounceLoader } from "react-spinners";

const PartinerPage = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState<IPartiner[]>([]);

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

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={"/"}
            className="border border-[#e7e7e7] flex title-font font-medium items-center text-gray-900"
          >
            <Image alt="" src={main_logo} className="max-w-[145px] w-full" />
          </Link>

          <Link
            href={"https://forms.gle/rrPrRPPVMgubgbWCA"}
            className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none"
          >
            <span className="flex items-start flex-col leading-none">
              <span className="text-xs text-gray-800">
                Sou profissional e quero participar
              </span>
            </span>
          </Link>
        </div>
      </header>

      {partnerToShow === undefined && (
        <div className="mt-20">
          <BounceLoader
            size={150}
            loading={isLoading}
            className="mx-auto mb-14"
            color="#e9d5ff"
          />
        </div>
      )}

      {partnerToShow !== undefined && (
        <main className="container mx-auto px-4 mt-3 h-[80vh]">
          <Link href={"/"} className="flex gap-3 text-base">
            <ArrowFatLeft size={22} />
            Voltar
          </Link>

          <div className="mt-7 flex flex-col md:flex-row items-start gap-8">
            {/* properties.Avatar.files.length !== 0 && (
              <img
                alt="team"
                className="w-36 h-36 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={properties.Avatar.files[0].file.url}
              />
            ) */}

            <div className="space-y-3 max-w-[32rem]">
              <div className="flex flex-col items-start justify-between gap-y-2">
                <p className="text-gray-900 text-xl font-bold">
                  {partnerToShow?.properties.Name.title[0].plain_text}
                </p>

                <div className="w-36 h-36 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4 flex items-center justify-center my-7">
                  <PImage size={28} className="text-gray-500" />
                </div>

                <div className="flex items-start gap-2">
                  {partnerToShow?.properties.Facebook.url && (
                    <Link href={partnerToShow?.properties.Facebook.url}>
                      <FacebookLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                  {partnerToShow?.properties.Instagram.url && (
                    <Link href={partnerToShow?.properties.Instagram.url}>
                      <InstagramLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                  {partnerToShow?.properties.Whatsapp.url && (
                    <Link href={partnerToShow?.properties.Whatsapp.url}>
                      <WhatsappLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                {partnerToShow?.properties.Details.rich_text[0].plain_text}
              </p>

              <div className="flex flex-wrap items-start gap-2 !my-6">
                {partnerToShow?.properties.Tags.multi_select.map((item) => {
                  return (
                    <p
                      key={item.id}
                      className="text-gray-900 rounded-sm text-xs bg-red-200 py-1 px-2"
                    >
                      {item.name}
                    </p>
                  );
                })}

                <div className="flex items-center justify-start gap-2">
                  {partnerToShow?.properties.Gratuitas.checkbox && (
                    <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                      Vagas gratuitas
                    </span>
                  )}

                  {partnerToShow?.properties.Valor_social?.checkbox && (
                    <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                      Valor social
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-[13px] blok mt-6">
                  Direto com o profissional você tem mais informações sobre os
                  atendimentos
                </p>

                {partnerToShow?.properties.Whatsapp.url && (
                  <Link
                    href={partnerToShow?.properties.Whatsapp.url}
                    className="bg-green-700 rounded-md px-4 py-2 text-white font-bold mt-2"
                  >
                    Entrar em contato pelo whatsapp
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Link
            href={"/"}
            className="border border-[#e7e7e7] flex title-font font-medium items-center text-gray-900"
          >
            <Image alt="" src={main_logo} className="max-w-[145px] w-full" />
          </Link>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 PrideCare —
            <Link
              href={"https://www.instagram.com/pridecare.pro/"}
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @prideCare
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-3">
            <Link href={"https://www.instagram.com/pridecare.pro/"}>
              <InstagramLogo size={26} className="text-gray-500" />
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default PartinerPage;
