// components/NavBar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
      <Link href="/events">
        <Button variant="ghost" className="w-full md:w-auto">
          Discover
        </Button>
      </Link>
      {session ? (
        <>
          <div className="hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <UserRoundIcon />
                  <span className="text-sm font-medium">
                    {session.user?.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col justify-center items-center space-y-6 text-sm lg:hidden">
            <Link href="/dashboard">Dashboard</Link>{" "}
            <Link href="/profile">Profile</Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </>
      ) : (
        <>
          <Link href="/dashboard/create">
            <Button variant="ghost" className="w-full md:w-auto">
              Create Event
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="w-full md:w-auto">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" className="w-full md:w-auto">
              Register
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
};
