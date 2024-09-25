"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";

// TODO:
// Verificar se há pridecare@user no localstorage
// Se sim, renderiza dashobard (OK)
// Se não, renderiza para login/register (OK)

const Dashboard = () => {
  useEffect(() => {
    const storedUser = localStorage.getItem("pridecare@user");

    if (!storedUser) {
      // Se o usuário não estiver no localStorage, redireciona para login/register
      redirect("/register");
    }
  }, []);

  return <div className="container mx-auto px-4 h-[81vh]">Dashboard</div>;
};

export default Dashboard;
