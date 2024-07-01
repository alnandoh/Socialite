"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/public/logo.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="h-screen bg-gradient-to-bl to-zinc-800 from-orange-900/90 text-white w-[350px] flex flex-col rounded-tr-[100px]">
      <div>
        <div className="flex items-center justify-left pl-4 py-4 mt-4">
          <Image src={Logo} alt="Logo" width={120} height={40} />
        </div>
        <nav>
          <ul className="flex flex-col space-y-2 py-4 pl-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2.5 pl-4 rounded transition duration-200 ${
                    router.pathname === item.href
                      ? "bg-gray-700"
                      : "hover:bg-gray-700 "
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
