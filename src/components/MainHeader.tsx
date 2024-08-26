import Link from "next/link";
import React from "react";
import main_logo from "@/assets/logo.svg";
import main_logo_new from "../assets/logo-pridecare-dark.svg";
import Image from "next/image";
import IsAuthenticatedButton from "./auth/IsAuthenticatedButton";

const MainHeader = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="lg:container mx-auto px-4 py-5 flex items-center justify-between gap-4">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-gray-900"
        >
          <Image alt="" src={main_logo_new} className="max-w-[145px] w-full" />
        </Link>

        <div className="flex items-center justify-center gap-4">
          {/* <Link
            href={"https://forms.gle/rrPrRPPVMgubgbWCA"}
            className="flex items-center justify-center text-center bg-[#222C60] font-bold text-white rounded-[2px] py-[10px] px-[15px] text-sm"
          >
            Quero aparecer aqui
          </Link> */}

          <IsAuthenticatedButton />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
