"use client";

import Image from "next/image";
import { transparentHorizontalLogo } from "./assets/assets";
import { Button } from "@/components/ui/button";
import { Navigation } from "./components/Navigation";

export default function Home() {
  return (
    <div className="bg-slate-200">
      <div className="max-w-5xl m-auto bg-slate-600">
        <Navigation />
      </div>
    </div>
  );
}
