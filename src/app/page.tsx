"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  FacebookLogo,
  InstagramLogo,
  WhatsappLogo,
} from "phosphor-react";
import Link from "next/link";
import main_logo from "@/assets/logo.svg";
import Image from "next/image";
import main_hero from "@/assets/main_hero.png";
import main_hero_mob from "@/assets/main_hero_mob.svg";

interface IPartiner {
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
    Whatsapp: { id: string; type: string; url: string };
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
  };
}

export default function Home() {
  const [partners, setPartners] = useState<IPartiner[]>([]);

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
        console.log(data.partners);
      })
      .catch((error) => {
        console.error("Erro ao obter os partners:", error);
      });
  }, []);

  return (
    <main className="">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a className="border border-[#e7e7e7] flex title-font font-medium items-center text-gray-900">
            <Image alt="" src={main_logo} className="max-w-[145px] w-full" />
          </a>

          {/* <nav className="flex flex-wrap items-center text-base justify-center gap-3 sm:gap-6">
            <a className="hover:text-gray-900">Quem somos</a>
            <a className="hover:text-gray-900">Profissionais</a>
          </nav> */}

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
          <div className="flex flex-col text-center w-full mb-20">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {partners &&
              partners.map((partner, index) => {
                return (
                  <div key={index} className="w-full">
                    <div className="h-full flex items-center justify-between border-gray-200 border p-4 rounded-lg gap-2">
                      <div className="flex items-center">
                        <img
                          alt="team"
                          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={partner.properties.Avatar.files[0].file.url}
                        />
                        <div className="flex-grow">
                          <h2 className="text-gray-900 title-font font-medium">
                            {partner.properties.Name.title[0].plain_text}
                          </h2>
                          <p className={`text-gray-500 text-sm`}>
                            {partner.properties.Specialty.select.name}
                          </p>

                          <div className="flex md:flex-col md:items-start items-center justify-start mt-2 gap-2">
                            {partner.properties.Gratuitas.checkbox && (
                              <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                                Vagas gratuitas
                              </span>
                            )}

                            {partner.properties.Valor_social?.checkbox && (
                              <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                                Valor social
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <PartnerModal {...partner} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="border border-[#e7e7e7] flex title-font font-medium items-center text-gray-900">
            <Image alt="" src={main_logo} className="max-w-[145px] w-full" />
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 PrideCare —
            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @prideCare
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-3">
            <Link href={""}>
              <InstagramLogo size={26} className="text-gray-500" />
            </Link>
            <Link href={""}>
              <WhatsappLogo size={26} className="text-gray-500" />
            </Link>
          </span>
        </div>
      </footer>
    </main>
  );
}

const PartnerModal = ({ properties }: IPartiner) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-2 rounded-lg bg-gray-100 hover:opacity-55 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-80" />
        <Dialog.Content
          className="bg-white rounded-md max-w-sm md:max-w-3xl w-full p-4"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex items-start justify-between border-b border-gray-200 pb-2">
            <Dialog.Title>Detalhes do profissinal</Dialog.Title>
            <Dialog.Close>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Dialog.Close>
          </div>

          <div className="mt-7 flex flex-col md:flex-row items-start gap-8">
            <img
              alt="team"
              className="w-36 h-36 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={properties.Avatar.files[0].file.url}
            />

            <div className="space-y-3 max-w-[32rem]">
              <div className="flex flex-col md:flex-row items-start justify-between gap-y-2">
                <p className="text-gray-900 text-xl font-bold">
                  {properties.Name.title[0].plain_text}
                </p>

                <div className="flex items-start gap-2">
                  {properties.Facebook.url && (
                    <Link href={properties.Facebook.url}>
                      <FacebookLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                  {properties.Instagram.url && (
                    <Link href={properties.Instagram.url}>
                      <InstagramLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                  {properties.Whatsapp.url && (
                    <Link href={properties.Whatsapp.url}>
                      <WhatsappLogo size={22} className="text-gray-500" />
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                {properties.Details.rich_text[0].plain_text}
              </p>

              <div className="flex flex-wrap items-start gap-2 !my-6">
                {properties.Tags.multi_select.map((item) => {
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
                  {properties.Gratuitas.checkbox && (
                    <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                      Vagas gratuitas
                    </span>
                  )}

                  {properties.Valor_social?.checkbox && (
                    <span className="text-gray-900 rounded-sm text-xs bg-purple-200 py-1 px-2">
                      Valor social
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-[13px] blok mt-6">
                  Direto com o profissional você tem mais informações sobre os
                  atendimentos{" "}
                  <ArrowDown
                    size={14}
                    className="inline-flex text-gray-700 ml-2"
                  />
                </p>

                {properties.Whatsapp.url && (
                  <Link
                    href={properties.Whatsapp.url}
                    className="bg-green-700 rounded-md px-4 py-2 text-white font-bold mt-2"
                  >
                    Entrar em contato pelo whatsapp
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
