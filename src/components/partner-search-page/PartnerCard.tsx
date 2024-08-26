import React from "react";
import Link from "next/link";
import { Image as PImage } from "phosphor-react";
import { IPartner } from "@/interfaces";
import { useSession } from "next-auth/react";
import { handleSignIn } from "@/actions";

interface PartnerCardProps {
  partner: IPartner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const session = useSession();

  const slugToPartnerPage =
    partner.properties.Slug.rich_text.length !== 0
      ? partner.properties.Slug.rich_text[0].text.content
      : "";
  const url = partner.properties.Avatar_url.url;

  return (
    <div className="border border-[#F5F5F5] p-5 rounded-[2px] flex flex-col justify-between gap-4">
      <div className="space-y-4">
        <div className="flex">
          {url !== null ? (
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center rounded-[5px] mr-4"
              src={url}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
              <PImage size={22} />
            </div>
          )}
          <div>
            <h2 className="text-gray-900 title-font font-semibold text-md">
              {partner.properties.Name.title[0].plain_text}
            </h2>
            <p className={`text-gray-500 text-xs`}>
              {partner.properties.Specialty.select.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start md:items-start md:justify-start flex-wrap gap-[10px] md:min-h-[50px]">
          {partner.properties.Tags.multi_select.slice(0, 3).map((item) => (
            <p
              key={item.id}
              className="text-gray-900 rounded-sm text-xs bg-gray-200 py-[2px] px-[6px]"
            >
              {item.name}
            </p>
          ))}
          {partner.properties.Tags.multi_select.length > 3 && (
            <p className="rounded-sm text-xs bg-pink-200 py-[2px] px-[6px]">
              +{partner.properties.Tags.multi_select.length - 3}
            </p>
          )}
        </div>
        <div>
          {partner.properties.Details.rich_text && (
            <span className="text-gray-900 rounded-sm text-[13px] line-clamp-4 overflow-hidden text-ellipsis">
              {partner.properties.Details.rich_text[0].plain_text}
            </span>
          )}
        </div>
      </div>

      {session.status === "authenticated" && (
        <Link
          href={`/partners/${slugToPartnerPage}`}
          className="flex items-center justify-center text-center bg-[#222C60] font-bold text-white rounded-[2px] py-[10px] text-xs"
        >
          Ver perfil completo
        </Link>
      )}

      {session.status === "unauthenticated" && (
        <form action={handleSignIn} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center text-center bg-transparent font-bold text-[#222C60]  rounded-[2px] py-[10px] text-xs"
          >
            Logar com Google para ver mais
          </button>
        </form>
      )}
    </div>
  );
};

export default PartnerCard;
