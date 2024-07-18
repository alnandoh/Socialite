import React from "react";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div
      onClick={() => signOut()}
      className="flex w-full gap-4 items-center justify-left pl-4 py-2.5 mb-8 rounded cursor-pointer self-end hover:bg-gray-700"
    >
      <LogOut />
      <p>Sign out</p>
    </div>
  );
}
