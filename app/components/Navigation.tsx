"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { transparentLogo } from "../assets/assets";

const TokoOfflineLink = [
  {
    title: "Koko Ponsel (COD/Klaim Garansi)",
    description: "Browse all components in the library.",
    link: "#",
  },
  {
    title: "Koko Gadget (COD/Klaim Garansi)",
    description: "Kotabaru, hr rachaman",
    link: "#",
  },
];

const KreditHpLink = [
  {
    title: "Kredivo",
    link: "#",
  },
  {
    title: "Home Kredit",
    link: "#",
  },
];

export function Navigation() {
  return (
    <div className="bg-white shadow-lg flex justify-center items-center h-full z-50 sticky">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem className="m-3">
            <Link href="/">
              <Image src={transparentLogo} alt="logo" width={40} height={40} />
            </Link>
          </NavigationMenuItem>

          {/* Location Service center */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger>Partner/Toko Offline</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute w-[270px]">
              <ul className="grid gap-4">
                <li>
                  {TokoOfflineLink.map((value, i) => (
                    <NavigationMenuLink asChild key={i}>
                      <Link href={value.link}>
                        <div className="font-medium">{value.title}</div>
                        <div className="text-muted-foreground">
                          {value.description}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Location Service center */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="relative">
              Kredit Hp
            </NavigationMenuTrigger>
            <NavigationMenuContent className="absolute">
              <ul className="grid w-[200px] gap-4">
                <li>
                  {KreditHpLink.map((value, i) => (
                    <NavigationMenuLink asChild key={i}>
                      <Link
                        href={value.link}
                        className="flex-row items-center gap-2"
                      >
                        {value.title}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
