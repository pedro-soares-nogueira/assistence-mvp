import { WhatsappLogo } from "phosphor-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface WhatsProps {
  linkWhatsApp: string;
}

const emailSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
});

type EmailFormData = z.infer<typeof emailSchema>;

const WhatsappButton = ({ linkWhatsApp }: WhatsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const sendEmailToServer = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://transmuscle.com.br/api/register_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta do servidor:", data.message);

        localStorage.setItem("email", email);
        setShowModal(false);

        window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
      } else {
        console.error("Erro ao salvar o e-mail");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: EmailFormData) => {
    sendEmailToServer(data.email);
  };

  const handleClick = () => {
    const email = localStorage.getItem("email");

    if (!email) {
      setShowModal(true);
    } else {
      window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center justify-center text-center bg-green-700 font-bold 
        text-white rounded-[2px] py-[10px] px-[15px] text-sm mt-12 
        max-w-[22rem] w-full mx-auto gap-2"
      >
        <WhatsappLogo size={22} />
        Entrar em contato pelo whatsapp
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-sm w-full mx-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold">Qual seu melhor e-mail?</h2>

              <button onClick={() => setShowModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
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
                  {loading ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsappButton;
