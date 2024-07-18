"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/public/logo.png";
import { LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/create", label: "Create Event" },
  { href: "/dashboard/events", label: "Manage Event" },
  { href: "/dashboard/transactions", label: "Transactions" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<React.FC>();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-bl to-zinc-800 from-orange-900/90 text-white w-[280px] flex flex-col rounded-tr-[100px] transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky`}
      >
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
                    pathname === item.href
                      ? "bg-gray-700"
                      : "hover:bg-gray-700 "
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
    </>
  );
}
