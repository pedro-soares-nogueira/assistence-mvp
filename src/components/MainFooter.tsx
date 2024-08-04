"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramLogo } from "phosphor-react";
import main_logo_new from "../assets/logo-pridecare-dark.svg";
import main_logo from "@/assets/logo.svg";
import React from "react";

const MainFooter = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href={"/"} className="">
          <Image alt="" src={main_logo_new} className="max-w-[145px] w-full" />
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 PrideCare —
          <Link
            href={"https://www.instagram.com/pridecare.pro/"}
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @prideCare
          </Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-3">
          <Link href={"https://www.instagram.com/pridecare.pro/"}>
            <InstagramLogo size={26} className="text-gray-500" />
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default MainFooter;
