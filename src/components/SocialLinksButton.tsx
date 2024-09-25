"use client";
import { FacebookLogo, InstagramLogo, WhatsappLogo } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("Digite um e-mail válido."),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface SocialLinksProps {
  partnerToShow: {
    properties: {
      Facebook: { url?: string };
      Instagram: { url?: string };
      Whatsapp: { number?: string | number };
    };
  };
  linkWhatsApp: string;
}

const SocialLinksButton = ({
  partnerToShow,
  linkWhatsApp,
}: SocialLinksProps) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const sendEmailToServer = async (name: string, email: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://transmuscle.com.br/api/register_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta do servidor:", data.message);

        localStorage.setItem("email", email);
        setShowModal(false);

        window.open(selectedUrl, "_blank", "noopener,noreferrer");
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
    sendEmailToServer(data.name, data.email);
  };

  const handleClick = (url: string | undefined) => {
    localStorage.removeItem("email");
    setSelectedUrl(url);

    const email = localStorage.getItem("email");

    if (!email) {
      setShowModal(true);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  console.log(partnerToShow.properties.Facebook.url);

  return (
    <>
      <div className="flex items-center justify-center md:items-start md:justify-start gap-3 !mt-4">
        {partnerToShow?.properties.Facebook.url && (
          <button
            onClick={() => handleClick(partnerToShow.properties.Facebook.url)}
            className={`bg-[#222C60] rounded-[4px] p-1 cursor-pointer`}
          >
            <FacebookLogo size={22} className="text-white" />
          </button>
        )}
        {partnerToShow?.properties.Instagram.url && (
          <button
            onClick={() => handleClick(partnerToShow.properties.Instagram.url)}
            className={`bg-[#222C60] rounded-[2px] p-1 cursor-pointer`}
          >
            <InstagramLogo size={22} className="text-white" />
          </button>
        )}
        {partnerToShow?.properties.Whatsapp.number && (
          <button
            onClick={() => handleClick(linkWhatsApp)}
            className={`bg-[#222C60] rounded-[2px] p-1 cursor-pointer`}
          >
            <WhatsappLogo size={22} className="text-white" />
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-sm w-full mx-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold">
                Quase lá! Só falta o seu nome e e-mail.
              </h2>

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
                <label htmlFor="name" className="block text-sm font-medium">
                  Como quer ser chamado?
                </label>
                <input
                  id="name"
                  type="name"
                  {...register("name")}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Qual seu melhor email?
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
                  {loading ? "Enviando..." : "Chamar profissional"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialLinksButton;
