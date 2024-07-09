import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { LoginForm } from "../_component/LoginForm";
import Login from "@/public/Login.webp";

export default function page() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src={Login}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="relative flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Link
            href="/"
            className="absolute top-10 left-1/2 justify-self-center -translate-x-[50%]"
          >
            <Image src={Logo} alt="Socialite logo" width={192} height={57} />
          </Link>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
