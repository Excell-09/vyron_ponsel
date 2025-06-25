"use client";

import { Navigation } from "./components/Navigation";
import ProductContent from "./components/ProductContent";

export default function Home() {
  return (
    <div className="bg-slate-200">
      <div className="max-w-5xl m-auto bg-white">
        <Navigation />
        <ProductContent />
      </div>
    </div>
  );
}
