import { handleSignIn } from "@/actions";
import { useSession } from "next-auth/react";
import { WhatsappLogo } from "phosphor-react";
import React from "react";

interface WhatsProps {
  linkWhatsApp: string;
}

const WhatsappButton = ({ linkWhatsApp }: WhatsProps) => {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" && (
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-center bg-green-700 font-bold 
      text-white rounded-[2px] py-[10px] px-[15px] text-sm mt-12 
      max-w-[22rem] w-full mx-auto gap-2"
        >
          <WhatsappLogo size={22} />
          Entrar em contato pelo whatsapp
        </a>
      )}

      {session.status === "unauthenticated" && (
        <form action={handleSignIn} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center text-center bg-transparent font-bold text-[#222C60] 
                    border border-[#222C60] rounded-[2px] py-[10px] text-xs mt-12"
          >
            Logar com Google para ver contato
          </button>
        </form>
      )}
    </>
  );
};

export default WhatsappButton;
