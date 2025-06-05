"use client";

import Image from "next/image";
import { transparentHorizontalLogo } from "./assets/assets";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-center py-5 border-b-2 border-b-gray-300">
        <Image
          src={transparentHorizontalLogo}
          alt="logo"
          width={150}
          height={150}
        />
      </nav>
    </div>
  );
}
