"use client";

import PartnerProfileForm from "@/components/PartnerProfileForm";
import { PartnerProfile } from "@/interfaces";
import { diffInMinutes } from "@/utils";
import { useRouter } from "next/navigation";
import { X } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IUser {
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
// Cadastrar parceiro real (pela rota /register e configurar em admin/dashboard)
// Configurar exibição de todos os parceiros em "/" (do banco de dados e do notion)

const Dashboard = () => {
  const [partner, setPartner] = useState<PartnerProfile>();
  const [user, setUser] = useState<IUser>();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

        if (minutesPassed > 10) {
          router.push("/login");
          toast.error("Link expirado - Faça login novamente.", {
            theme: "colored",
            position: "top-right",
          });
        } else {
          fetch("https://api-pridecare.com/api/get_logged_partner.php", {
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
              setPartner(data.partner_profile);
              setUser(data.user);
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

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto px-4 min-h-[82vh]">
      <h2 className="block text-3xl mb-4 heading-bold">
        Dashboard, {user?.name}
      </h2>

      {partner ? (
        <button
          className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none text-sm text-gray-800"
          onClick={openModal}
        >
          Editar perfil de parceiro
        </button>
      ) : (
        <button
          className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none text-sm text-gray-800"
          onClick={openModal}
        >
          Criar perfil de parceiro
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative max-h-[95vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-700"
              onClick={closeModal}
            >
              <X size={22} weight="bold" />
            </button>

            <PartnerProfileForm
              details={{
                user_id: user?.id ?? "",
                fantasy_name: partner?.fantasy_name ?? null,
                prof_email: partner?.prof_email ?? null,
                bio: partner?.bio ?? null,
                avatar_url: partner?.avatar_url ?? null,
                city_ibge_id: partner?.city_ibge_id ?? null,
                tags: partner?.tags ? JSON.parse(partner.tags as any) : [],
                specialty_id: partner?.specialty_id ?? null,
                whatsapp: partner?.whatsapp ?? null,
                instagram: partner?.instagram ?? null,
                facebook: partner?.facebook ?? null,
                has_social_value: partner?.has_social_value ?? false,
                has_duty_free: partner?.has_duty_free ?? false,
                duty_free_count: partner?.duty_free_count
                  ? partner.duty_free_count.toString()
                  : null,
                online: partner?.online ?? false,
                in_person: partner?.in_person ?? false,
                address: partner?.address ?? null,
                professional_registration:
                  partner?.professional_registration ?? null,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
