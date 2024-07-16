import Image from "next/image";
import Link from "next/link";
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
      <div className="flex flex-col items-center py-12 px-10 h-full">
        <Link href="/">
          <p className="text-5xl font-medium">
            Socia<span className="text-orange-400">lite</span>
          </p>
        </Link>
        <div className="my-auto grid w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <LoginForm />
          <div className="mt-2 text-center text-sm">
            <Link href="/forgot-password" className=" underline">
              Forgot your password?
            </Link>
            <div className="mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
