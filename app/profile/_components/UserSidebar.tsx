"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/public/logo.png";
import { LogOut } from "lucide-react";

const navItems = [
  { href: "/profile", label: "My Profile" },
  { href: "/profile/tickets", label: "My Tickets" },
];

export default function Sidebar() {
  const [page, setPage] = React.useState<React.FC>();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="sticky top-0 h-screen bg-gradient-to-bl to-zinc-800 from-orange-900/90 text-white min-w-[280px] flex flex-col rounded-tr-[100px]">
      <div className="flex items-center justify-left pl-4 py-4 mt-8">
        <Image src={Logo} alt="Logo" width={120} height={40} />
      </div>
      <nav className="flex flex-col h-full pl-4">
        <ul className="flex flex-col h-full space-y-2 py-4 ">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2.5 pl-4 rounded transition duration-200 ${
                  pathname === item.href ? "bg-gray-700" : "hover:bg-gray-700 "
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div
          onClick={handleLogout}
          className="flex w-full gap-4 items-center justify-left pl-4 py-2.5 mb-8 rounded cursor-pointer self-end hover:bg-gray-700"
        >
          <LogOut />
          <p>Sign out</p>
        </div>
      </nav>
    </div>
  );
}
