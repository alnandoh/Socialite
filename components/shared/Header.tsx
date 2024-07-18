// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import logo from "/public/logo.png";
import { NavBar } from "./NavBar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b py-4 bg-primary-foreground">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={logo} alt="Socialite logo" width={128} height={38} />
        </Link>
        <div className="hidden lg:block lg:w-[400px]">
          <Search />
        </div>
        <div className="hidden lg:block">
          <NavBar />
        </div>
        <div className="lg:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button className="p-2">
                <MenuIcon size={24} />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col items-center justify-center p-4 space-y-2">
                <Search />
                <NavBar />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
