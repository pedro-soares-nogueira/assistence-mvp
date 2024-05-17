import Link from "next/link";
import React from "react";
import main_logo from "@/assets/logo.svg";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={"/"}
          className="border border-[#e7e7e7] flex title-font font-medium items-center text-gray-900"
        >
          <Image alt="" src={main_logo} className="max-w-[145px] w-full" />
        </Link>

        <Link
          href={"https://forms.gle/rrPrRPPVMgubgbWCA"}
          className="bg-gray-200 inline-flex py-3 px-5 rounded-lg items-center hover:opacity-80 focus:outline-none"
        >
          <span className="flex items-start flex-col leading-none">
            <span className="text-xs text-gray-800">
              Sou profissional e quero participar
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default MainHeader;
