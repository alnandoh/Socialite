import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../_component/RegisterForm";
import Register from "@/public/register.webp";

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
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
