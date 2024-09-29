"use client";

import { diffInMinutes } from "@/utils";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("pridecare@user");

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
  }, []);

  return (
    <div className="container mx-auto px-4 h-[81vh]">
      Dashboard, {partner?.name}
    </div>
  );
};

export default Dashboard;
