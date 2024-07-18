import type { Metadata } from "next";
import QueryProvider from "@/libs/utils/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Socialite",
  description:
    "Event management platform build to satisfy the social lifestyles of the masses.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={work_sans.className}>
        <QueryProvider>
          <SessionProvider session={session}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
