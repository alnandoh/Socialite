import Image from "next/image";
import Link from "next/link";
import Register from "@/public/register.webp";
import ForgotPasswordForm from "../_component/ForgotPasswordForm";
import { Lock } from "lucide-react";

export default function page() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 xl:min-h-[800px]">
      <Link href="/" className="hidden bg-muted lg:block">
        <Image
          src={Register}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </Link>
      <div className="flex flex-col items-center py-12 px-10 h-full">
        <Link href="/">
          <p className="text-5xl font-medium">
            Socia<span className="text-orange-400">lite</span>
          </p>
        </Link>
        <div className="my-auto grid w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-semibold">Forgot Password</h1>
          </div>
          <div className="mx-auto flex items-center justify-center w-28 h-28 bg-slate-100 border-4 border-black rounded-full shadow-lg">
            <Lock className="w-14 h-14" />
          </div>
          <ForgotPasswordForm />
          <div className="text-center text-sm">
            Back to{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
