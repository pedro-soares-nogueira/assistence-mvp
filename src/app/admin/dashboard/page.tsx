"use client";

import PartnerProfileForm from "@/components/PartnerProfileForm";
import { diffInMinutes } from "@/utils";
import { useRouter } from "next/navigation";
import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";

interface IPartner {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  ticket_code: string;
  created_at: string;
  updated_at: string;
  password: string;
}

// TODO:

const Dashboard = () => {
  const [partner, setPartner] = useState<IPartner>();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a exibição da modal
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("pridecare@user");

    if (user === null) {
      router.push("/login");
    }

    if (user) {
      try {
        const userObj = JSON.parse(user) as {
          email: string;
          createdAt: string;
        };

        if (!userObj.createdAt) {
          throw new Error("Data de criação não encontrada.");
        }

        const createdAt = userObj.createdAt;
        const minutesPassed = diffInMinutes(createdAt);

        if (minutesPassed > 2) {
          router.push("/login");
          console.log("Link expirado - Faça login novamente");
        } else {
          fetch("https://transmuscle.com.br/api/get-logged-partner.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userObj.email }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro ao obter os partners.");
              }
              return response.json();
            })
            .then((data) => {
              setPartner(data.partner);
            })
            .catch((error) => {
              console.error("Erro ao obter os partners:", error);
            });
        }
      } catch (error) {
        console.error("Erro ao processar o usuário armazenado:", error);
      }
    }
  }, [router]);

  // Função para abrir a modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar a modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 min-h-[82vh]">
      <h2 className="block text-3xl mb-4 heading-bold">
        Dashboard, {partner?.name}
      </h2>

      {/* Botão para abrir a modal */}
      <button
        className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none text-sm text-gray-800"
        onClick={openModal}
      >
        Editar perfil de parceiro
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-7xl p-6 relative max-h-[80vh] overflow-y-auto">
            {/* Botão de fechar a modal */}
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={closeModal}
            >
              <X size={22} weight="bold" />
            </button>

            {/* Conteúdo da modal: Formulário de edição */}
            <PartnerProfileForm
              details={{
                user_id: partner?.id ?? "",
                fantasy_name: partner?.name ?? null,
                prof_email: partner?.email ?? null,
                bio: null,
                avatar_url: partner?.avatar_url ?? null,
                city_ibge_id: null,
                tags: [],
                specialty_id: null,
                whatsapp: null,
                instagram: null,
                facebook: null,
                has_social_value: false,
                has_duty_free: false,
                duty_free_count: null,
                online: false,
                in_person: false,
                address: null,
                professional_registration: null,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
