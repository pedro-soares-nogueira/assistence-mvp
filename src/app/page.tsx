"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FacebookLogo, InstagramLogo, WhatsappLogo } from "phosphor-react";
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

          <nav className="flex flex-wrap items-center text-base justify-center gap-3 sm:gap-6">
            <a className="hover:text-gray-900">Quem somos</a>
            <a className="hover:text-gray-900">Profissionais</a>
          </nav>

          <button className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none">
            <span className="flex items-start flex-col leading-none">
              <span className="text-xs text-gray-800">
                Sou profissional e quero participar
              </span>
            </span>
          </button>
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
              <img
                className="object-cover object-center rounded block lg:hidden"
                alt="hero"
                src="https://dummyimage.com/720x600"
              />
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
              <div className="h-[405px] object-cover">
                <Image alt="" src={main_hero_mob} className="w-full" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {partners &&
              partners.map((partner, index) => {
                return (
                  <div key={index} className="w-full">
                    <div className="h-full flex items-center justify-between border-gray-200 border p-4 rounded-lg">
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
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
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
                  <Link href={properties.Facebook.url}>
                    <FacebookLogo size={22} className="text-gray-500" />
                  </Link>
                  <Link href={properties.Instagram.url}>
                    <InstagramLogo size={22} className="text-gray-500" />
                  </Link>
                  <Link href={properties.Whatsapp.url}>
                    <WhatsappLogo size={22} className="text-gray-500" />
                  </Link>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                {properties.Details.rich_text[0].plain_text}
              </p>

              <div className="flex items-start gap-2 !my-6">
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
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
