import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import logo from "/public/logo.png";

export const Header = () => {
  return (
    <header className="w-full border-b py-4 bg-primary-foreground">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image src={logo} alt="Socialite logo" width={128} height={38} />
        </Link>
        <Search />
        <div className="space-x-3">
          <Link href="/events" className="nav-link">
            Discover
          </Link>
          <Link href="/dashboard" className="nav-link">
            Create Event
          </Link>
          <Link href="/login" className="nav-link">
            Login
          </Link>
          <Link href="/register" className="nav-link">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};
