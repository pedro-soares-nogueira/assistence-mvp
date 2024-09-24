"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userSchema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    email: z.string().email("Digite um e-mail válido."),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string().min(6, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type UserFormData = z.infer<typeof userSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      setLoading(true);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await fetch(
        "https://transmuscle.com.br/api/register_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Falha no cadastro");
      }

      console.log(userData);

      console.log("Cadastro realizado com sucesso");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-md max-w-sm w-full mx-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">Pode entrar!</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Como quer ser chamado?*
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Qual seu melhor email?*
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Senha*</label>
          <input
            type="password"
            {...register("password")}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Confirme a senha*</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className={`px-4 py-2 bg-green-700 text-white rounded ${
              loading && "opacity-25 cursor-not-allowed"
            }`}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
