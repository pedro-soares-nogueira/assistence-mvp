"use client";

import { diffInMinutes } from "@/utils";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// TODO:
// Verificar se há pridecare@user no localstorage
// Se sim, renderiza dashobard (OK) - com senha
// Se não, renderiza para login/register (OK)

const Dashboard = () => {
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
          // console.log("Redirecionando para o dashboard...");
        }
      } catch (error) {
        console.error("Erro ao processar o usuário armazenado:", error);
      }
    }
  }, []);

  return <div className="container mx-auto px-4 h-[81vh]">Dashboard</div>;
};

export default Dashboard;
