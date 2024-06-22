import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="w-full border-b py-4 bg-primary-foreground">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src="/logo.png" alt="Socialite logo" width={128} height={38} />
          Socialite
        </Link>
        <div>testing</div>
        <div className="space-x-4">
          {/* register or login as organizer */}
          <Link href="/" className="nav-link">
            Create Event
          </Link>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          {/* register as user */}
          <Link href="/register" className="nav-link">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};
