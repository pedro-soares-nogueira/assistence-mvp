import { handleSignIn } from "@/actions";
import { useSession } from "next-auth/react";
import { FacebookLogo, InstagramLogo, WhatsappLogo } from "phosphor-react";

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
  const session = useSession();

  const handleClick = (url: string | undefined) => {
    // if (session.status === "authenticated" && url) {
    window.open(url, "_blank"); //, "noopener,noreferrer");
    // }
  };

  console.log(partnerToShow.properties.Facebook.url);

  return (
    <div className="flex items-center justify-center md:items-start md:justify-start gap-3 !mt-4">
      {partnerToShow?.properties.Facebook.url && (
        <button
          onClick={() => handleClick(partnerToShow.properties.Facebook.url)}
          // disabled={session.status === "unauthenticated"}
          className={`bg-[#222C60] rounded-[4px] p-1 cursor-pointer`}
          // ${ session.status === "unauthenticated"
          //   ? "opacity-50 cursor-not-allowed"
          //   : "" }
        >
          <FacebookLogo size={22} className="text-white" />
        </button>
      )}
      {partnerToShow?.properties.Instagram.url && (
        <button
          onClick={() => handleClick(partnerToShow.properties.Instagram.url)}
          // disabled={session.status === "unauthenticated"}
          className={`bg-[#222C60] rounded-[2px] p-1 cursor-pointer`}
          // ${
          // session.status === "unauthenticated"
          //   ? "opacity-50 cursor-not-allowed"
          //   : ""
          // }
        >
          <InstagramLogo size={22} className="text-white" />
        </button>
      )}
      {partnerToShow?.properties.Whatsapp.number && (
        <button
          onClick={() => handleClick(linkWhatsApp)}
          // disabled={session.status === "unauthenticated"}
          className={`bg-[#222C60] rounded-[2px] p-1 cursor-pointer`}
          // ${
          // session.status === "unauthenticated"
          //   ? "opacity-50 cursor-not-allowed"
          //   : ""
          // }
        >
          <WhatsappLogo size={22} className="text-white" />
        </button>
      )}

      {/* {session.status === "unauthenticated" && (
        <form action={handleSignIn} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center text-center bg-transparent font-bold text-[#222C60] 
                      border border-[#222C60] rounded-[2px] py-[10px] text-xs mt-12"
          >
            Logar com Google para ver contato
          </button>
        </form>
      )} */}
    </div>
  );
};

export default SocialLinksButton;
