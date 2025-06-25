"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProductContent() {
  return (
    <section className="px-5">
      <div className="max-w-lg mx-auto my-5 flex items-center gap-1">
        <Input type="search" placeholder="Mau Main Game Dengan Hp Apa?" />
        <Button type="button" color="">
          <Search />
        </Button>
      </div>
    </section>
  );
}
